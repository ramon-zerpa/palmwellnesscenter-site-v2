param(
  [string[]]$Urls = @("/primary-care/"),
  [int[]]$Widths = @(360,412,768,1024,1440),
  [ValidateSet("audit","shots","motion","click")][string]$Mode = "audit",
  [int]$Height = 900,
  [int[]]$ScrollY = @(0),
  [string]$PreJs = ""
)
$ErrorActionPreference = "Stop"
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$port = 9340
$base = "http://127.0.0.1:4321"
$ud = Join-Path $env:TEMP "cdp-profile-pc-$port"
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like "*--remote-debugging-port=$port*" } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 400
$proc = Start-Process -FilePath $chrome -PassThru -WindowStyle Hidden -ArgumentList @(
  "--headless=new","--disable-gpu","--no-first-run","--no-default-browser-check",
  "--disable-extensions","--hide-scrollbars","--remote-debugging-port=$port","--user-data-dir=$ud","about:blank"
)
$ws = $null
try {
  $ok = $false
  for ($i=0; $i -lt 60; $i++) {
    try { Invoke-RestMethod "http://127.0.0.1:$port/json/version" -TimeoutSec 2 | Out-Null; $ok=$true; break } catch { Start-Sleep -Milliseconds 400 }
  }
  if (-not $ok) { throw "chrome CDP not reachable on $port" }

  $script:id = 0
  function Send-Cdp($method, $params) {
    $script:id++
    $obj = @{ id=$script:id; method=$method }
    if ($null -ne $params) { $obj.params = $params }
    $json = $obj | ConvertTo-Json -Depth 14 -Compress
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    $seg = New-Object System.ArraySegment[byte] -ArgumentList @(,$bytes)
    $ws.SendAsync($seg, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, [System.Threading.CancellationToken]::None).Wait(10000) | Out-Null
    return $script:id
  }
  function Wait-Cdp($wantId) {
    $buf = New-Object byte[] 8388608
    $deadline = (Get-Date).AddSeconds(40)
    while ((Get-Date) -lt $deadline) {
      $seg = New-Object System.ArraySegment[byte] -ArgumentList @(,$buf)
      $sb = New-Object System.Text.StringBuilder
      do {
        $res = $ws.ReceiveAsync($seg, [System.Threading.CancellationToken]::None).Result
        [void]$sb.Append([System.Text.Encoding]::UTF8.GetString($buf, 0, $res.Count))
      } while (-not $res.EndOfMessage)
      $o = $sb.ToString() | ConvertFrom-Json
      if ($o.id -eq $wantId) { return $o }
    }
    return $null
  }

  $probe = @'
(() => {
  const inScroller = el => { let n = el.parentElement; while (n && n !== document.body) { const o = getComputedStyle(n).overflowX; if (o !== "visible") return true; n = n.parentElement; } return false; };
  const out = { vw: innerWidth, ovX: document.documentElement.scrollWidth - innerWidth };
  const sh = document.querySelector(".shell");
  if (sh) { const r = sh.getBoundingClientRect(); out.shell = [Math.round(r.left), Math.round(r.right), Math.round(r.width)]; }
  const hd = document.querySelector("header");
  if (hd) { out.headerH = Math.round(hd.getBoundingClientRect().height); out.headerBottom = Math.round(hd.getBoundingClientRect().bottom); }
  const an = document.querySelector("main nav");
  if (an) { const r = an.getBoundingClientRect(); out.anchorTop = Math.round(r.top); out.anchorBottom = Math.round(r.bottom); out.anchorGap = Math.round(r.top - (hd ? hd.getBoundingClientRect().bottom : 0)); }
  const off = [];
  document.querySelectorAll("body *").forEach(e => {
    if (inScroller(e)) return;
    const r = e.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (r.right > innerWidth + 1) off.push({ t: e.tagName, c: String(e.className).slice(0, 46), o: Math.round(r.right - innerWidth) });
  });
  off.sort((a, b) => b.o - a.o);
  out.off = off.slice(0, 4);
  out.h1 = document.querySelectorAll("h1").length;
  out.sections = document.querySelectorAll("main section").length;
  out.imgsNoDims = [...document.images].filter(i => !i.getAttribute("width") || !i.getAttribute("height")).length;
  out.tinyTaps = [...document.querySelectorAll("a,button,summary")].filter(e => { const r = e.getBoundingClientRect(); return r.height > 0 && r.height < 24; }).length;
  out.tiny = [...document.querySelectorAll("a,button,summary")].filter(e => { const r = e.getBoundingClientRect(); return r.height > 0 && r.height < 24; }).slice(0, 8).map(e => ({ t: e.tagName, c: String(e.className).slice(0, 28), h: Math.round(e.getBoundingClientRect().height), x: (e.textContent || "").trim().slice(0, 22) }));
  const clipped = [];
  document.querySelectorAll("body *").forEach(e => {
    if (e.children.length) return;
    if (getComputedStyle(e).overflowX !== "visible") return;
    if (e.scrollWidth > e.clientWidth + 1) clipped.push({ t: e.tagName, c: String(e.className).slice(0, 44), sw: e.scrollWidth, cw: e.clientWidth });
  });
  out.clippedText = clipped.slice(0, 4);
  out.openDetails = document.querySelectorAll("details[open]").length;
  out.docH = document.documentElement.scrollHeight;
  out.secY = [...document.querySelectorAll("main section")].map(s => [Math.round(s.getBoundingClientRect().top + scrollY), Math.round(s.getBoundingClientRect().height), (s.id || s.className.split(" ")[0] || "sec")]);
  return JSON.stringify(out);
})()
'@

  $shotIdx = 0
  foreach ($u in $Urls) {
    $target = $base + $u
    $tab = Invoke-RestMethod "http://127.0.0.1:$port/json/new?$([uri]::EscapeDataString($target))" -Method Put
    $ws = New-Object System.Net.WebSockets.ClientWebSocket
    $ws.ConnectAsync([uri]$tab.webSocketDebuggerUrl, [System.Threading.CancellationToken]::None).Wait(10000) | Out-Null
    Send-Cdp "Runtime.enable" $null | Out-Null
    Send-Cdp "Page.enable" $null | Out-Null
    Start-Sleep -Milliseconds 2500

    foreach ($w in $Widths) {
      Send-Cdp "Emulation.setDeviceMetricsOverride" @{ width=$w; height=$Height; deviceScaleFactor=1; mobile=$false } | Out-Null
      Start-Sleep -Milliseconds 900

      if ($Mode -eq "motion") {
        $mprobe = '(()=>{const s=[".hero-media",".hero-media__img",".hero-ambient__glow--a",".hero-pulse"];const o=s.map(x=>{const e=document.querySelector(x);if(!e)return x+" MISSING";const c=getComputedStyle(e);return x+" => "+c.animationName+" | dur "+c.animationDuration+" | iter "+c.animationIterationCount;});return o.join("\n");})()'
        $r1 = Send-Cdp "Runtime.evaluate" @{ expression=$mprobe; returnByValue=$true }
        $o1 = Wait-Cdp $r1
        Write-Output "--- normal (w=$w) ---"
        Write-Output $o1.result.result.value
        Send-Cdp "Emulation.setEmulatedMedia" @{ features=@(@{name="prefers-reduced-motion"; value="reduce"}) } | Out-Null
        Start-Sleep -Milliseconds 500
        $r2 = Send-Cdp "Runtime.evaluate" @{ expression=$mprobe; returnByValue=$true }
        $o2 = Wait-Cdp $r2
        Write-Output "--- prefers-reduced-motion: reduce (w=$w) ---"
        Write-Output $o2.result.result.value
        Send-Cdp "Emulation.setEmulatedMedia" @{ features=@() } | Out-Null
      }

      if ($Mode -eq "click") {
        $cprobe = '(async()=>{const nav=document.querySelector("[data-anchor-nav]");const links=nav.querySelectorAll(''a[href^="#"]'');const link=links[1];const href=link.getAttribute("href");const urlBefore=location.href;link.click();await new Promise(r=>setTimeout(r,1500));const t=document.getElementById(href.slice(1));const cs=getComputedStyle(nav);return JSON.stringify({navH:Math.round(nav.getBoundingClientRect().height),navPadTop:cs.paddingTop,navPadBottom:cs.paddingBottom,clicked:href,urlHasHash:location.href.indexOf("#")>-1,urlUnchanged:location.href===urlBefore,scrollY:Math.round(window.scrollY),targetTop:Math.round(t.getBoundingClientRect().top),activeIsTarget:document.activeElement===t});})()'
        $rc = Send-Cdp "Runtime.evaluate" @{ expression=$cprobe; returnByValue=$true; awaitPromise=$true }
        $oc = Wait-Cdp $rc
        Write-Output ("w=$w " + ($oc | ConvertTo-Json -Depth 12 -Compress))
      }

      if ($Mode -eq "audit") {
        if ($ScrollY.Count -gt 0 -and $ScrollY[0] -gt 0) {
          Send-Cdp "Runtime.evaluate" @{ expression="window.scrollTo(0,$($ScrollY[0]))"; returnByValue=$true } | Out-Null
          Start-Sleep -Milliseconds 700
        }
        $rid = Send-Cdp "Runtime.evaluate" @{ expression=$probe; returnByValue=$true }
        $o = Wait-Cdp $rid
        if ($o -and $o.result -and $o.result.result) {
          Write-Output ("{0}|{1}|{2}" -f $u, $w, $o.result.result.value)
        } elseif ($o -and $o.result -and $o.result.exceptionDetails) {
          Write-Output ("{0}|{1}|EXC {2}" -f $u, $w, ($o.result.exceptionDetails.text))
        } else {
          Write-Output ("{0}|{1}|NO RESPONSE" -f $u, $w)
        }
      } else {
        if ($Mode -ne "shots") { continue }
        $slug = ($u.Trim("/") -replace "[^a-zA-Z0-9]+","-")
        if ($slug -eq "") { $slug = "home" }
        foreach ($y in $ScrollY) {
          Send-Cdp "Runtime.evaluate" @{ expression="window.scrollTo(0,$y)"; returnByValue=$true } | Out-Null
          Start-Sleep -Milliseconds 700
          if ($PreJs -ne "") {
            $rp = Send-Cdp "Runtime.evaluate" @{ expression=$PreJs; returnByValue=$true }
            Wait-Cdp $rp | Out-Null
            Start-Sleep -Milliseconds 400
          }
          $rid = Send-Cdp "Page.captureScreenshot" @{ format="png" }
          $o = Wait-Cdp $rid
          if ($o -and $o.result -and $o.result.data) {
            $shotIdx++
            $file = Join-Path $env:TEMP ("pc-" + $slug + "-" + $w + "-y" + $y + ".png")
            [System.IO.File]::WriteAllBytes($file, [Convert]::FromBase64String($o.result.data))
            Write-Output ("SHOT " + $file)
          } else {
            Write-Output ("SHOT FAIL " + $slug + " " + $w + " y" + $y)
          }
        }
      }
    }
    try { $ws.Dispose() } catch {}
    $ws = $null
    Invoke-RestMethod "http://127.0.0.1:$port/json/close/$($tab.id)" -Method Get -ErrorAction SilentlyContinue | Out-Null
  }
} finally {
  if ($ws) { try { $ws.Dispose() } catch {} }
  if ($proc) { Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue }
}
