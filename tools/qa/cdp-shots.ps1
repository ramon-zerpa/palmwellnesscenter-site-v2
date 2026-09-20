param(
  [string]$Url = "http://127.0.0.1:4321/",
  [int]$Width = 1440,
  [int]$Height = 900,
  [string[]]$Scrolls = @("0"),
  [string]$OutDir = (Join-Path $env:TEMP "pw-shots")
)
$ErrorActionPreference = "Stop"
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$port = 9335
$ud = Join-Path $env:TEMP "cdp-profile-shots-$port"
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like "*--remote-debugging-port=$port*" } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 500
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$proc = Start-Process -FilePath $chrome -PassThru -WindowStyle Hidden -ArgumentList @(
  "--headless=new","--disable-gpu","--no-first-run","--no-default-browser-check",
  "--disable-extensions","--hide-scrollbars","--remote-debugging-port=$port","--user-data-dir=$ud","about:blank"
)
$ws = $null
try {
  $ok = $false
  for ($i=0; $i -lt 50; $i++) {
    try { Invoke-RestMethod "http://127.0.0.1:$port/json/version" -TimeoutSec 2 | Out-Null; $ok=$true; break } catch { Start-Sleep -Milliseconds 400 }
  }
  if (-not $ok) { throw "chrome CDP not reachable on $port" }
  $bust = $Url + ($(if ($Url.Contains("?")) { "&" } else { "?" })) + "__t=" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  $tab = Invoke-RestMethod "http://127.0.0.1:$port/json/new?$([uri]::EscapeDataString($bust))" -Method Put
  $ws = New-Object System.Net.WebSockets.ClientWebSocket
  $ws.ConnectAsync([uri]$tab.webSocketDebuggerUrl, [System.Threading.CancellationToken]::None).Wait(8000) | Out-Null

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
    $buf = New-Object byte[] 8388608
    $deadline = (Get-Date).AddSeconds(30)
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

  Send-Cdp "Runtime.enable" $null | Out-Null
  Send-Cdp "Page.enable" $null | Out-Null
  Send-Cdp "Emulation.setDeviceMetricsOverride" @{ width=$Width; height=$Height; deviceScaleFactor=1; mobile=$false } | Out-Null
  Start-Sleep -Milliseconds 2500

  foreach ($s in $Scrolls) {
    $r = Send-Cdp "Runtime.evaluate" @{ expression="window.scrollTo(0,$s); 'ok'"; returnByValue=$true }
    Wait-Cdp $r | Out-Null
    Start-Sleep -Milliseconds 900
    $rid = Send-Cdp "Page.captureScreenshot" @{ format="png" }
    $o = Wait-Cdp $rid
    if ($o -and $o.result -and $o.result.data) {
      $file = Join-Path $OutDir ("w$Width-y$s.png")
      [IO.File]::WriteAllBytes($file, [Convert]::FromBase64String($o.result.data))
      Write-Output ("saved " + $file)
    } else {
      Write-Output ("FAILED at y=$s")
    }
  }
} finally {
  if ($ws) { try { $ws.Dispose() } catch {} }
  if ($proc) { Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue }
}
