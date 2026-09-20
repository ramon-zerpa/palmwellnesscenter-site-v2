param(
  [string[]]$Urls,
  [int[]]$Widths = @(1440, 390)
)
$ErrorActionPreference = "Stop"
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$port = 9336
$ud = Join-Path $env:TEMP "cdp-profile-audit-$port"
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like "*--remote-debugging-port=$port*" } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 500
$proc = Start-Process -FilePath $chrome -PassThru -WindowStyle Hidden -ArgumentList @(
  "--headless=new","--disable-gpu","--no-first-run","--no-default-browser-check",
  "--disable-extensions","--hide-scrollbars","--remote-debugging-port=$port","--user-data-dir=$ud","about:blank"
)

$probe = @'
(() => {
  const out = {};
  out.vw = innerWidth;
  out.overflowX = document.documentElement.scrollWidth - innerWidth;
  const h = document.querySelector('header');
  const c = h && h.querySelector('.container-wide');
  if (c) {
    const padR = parseFloat(getComputedStyle(c).paddingRight);
    out.headerOverflow = Math.round(c.lastElementChild.getBoundingClientRect().right - (c.getBoundingClientRect().right - padR));
  }
  let worst = null;
  document.querySelectorAll('body *').forEach(e => {
    const r = e.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (r.right > innerWidth + 1) {
      if (!worst || r.right > worst.right) worst = { right: Math.round(r.right), tag: e.tagName, cls: String(e.className).slice(0, 60) };
    }
  });
  out.widestOverflow = worst;
  out.stickyBar = !!document.querySelector('div.fixed.bottom-0');
  out.h1Count = document.querySelectorAll('h1').length;
  out.imgsNoDims = [...document.images].filter(i => !i.getAttribute('width') || !i.getAttribute('height')).length;
  out.imgCount = document.images.length;
  return JSON.stringify(out);
})()
'@

$ws = $null
try {
  $ok = $false
  for ($i=0; $i -lt 50; $i++) {
    try { Invoke-RestMethod "http://127.0.0.1:$port/json/version" -TimeoutSec 2 | Out-Null; $ok=$true; break } catch { Start-Sleep -Milliseconds 400 }
  }
  if (-not $ok) { throw "chrome CDP not reachable on $port" }

  $script:id = 0
  function Send-Cdp($method, $params) {
    $script:id++
    $obj = @{ id=$script:id; method=$method }
    if ($null -ne $params) { $obj.params = $params }
    $json = $obj | ConvertTo-Json -Depth 12 -Compress
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    $seg = New-Object System.ArraySegment[byte] -ArgumentList @(,$bytes)
    $ws.SendAsync($seg, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, [System.Threading.CancellationToken]::None).Wait(8000) | Out-Null
    return $script:id
  }
  function Wait-Cdp($wantId) {
    $buf = New-Object byte[] 4194304
    $deadline = (Get-Date).AddSeconds(25)
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

  foreach ($u in $Urls) {
    $full = "http://127.0.0.1:4321" + $u
    $bust = $full + ($(if ($full.Contains("?")) { "&" } else { "?" })) + "__t=" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    $tab = Invoke-RestMethod "http://127.0.0.1:$port/json/new?$([uri]::EscapeDataString($bust))" -Method Put
    $ws = New-Object System.Net.WebSockets.ClientWebSocket
    $ws.ConnectAsync([uri]$tab.webSocketDebuggerUrl, [System.Threading.CancellationToken]::None).Wait(8000) | Out-Null
    Send-Cdp "Runtime.enable" $null | Out-Null
    Start-Sleep -Milliseconds 1800
    foreach ($w in $Widths) {
      Send-Cdp "Emulation.setDeviceMetricsOverride" @{ width=$w; height=900; deviceScaleFactor=1; mobile=$false } | Out-Null
      Start-Sleep -Milliseconds 900
      $rid = Send-Cdp "Runtime.evaluate" @{ expression=$probe; returnByValue=$true }
      $o = Wait-Cdp $rid
      if ($o -and $o.result -and $o.result.result) {
        Write-Output ("{0}|{1}|{2}" -f $u, $w, $o.result.result.value)
      } else {
        Write-Output ("{0}|{1}|NO RESPONSE" -f $u, $w)
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
