param(
  [string]$Url = "http://127.0.0.1:4321/",
  [int[]]$Widths = @(1440,1280),
  [string]$ExprFile = ""
)
$ErrorActionPreference = "Stop"
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$port = 9334
$ud = Join-Path $env:TEMP "cdp-profile-$port"
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like "*--remote-debugging-port=$port*" } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 500
$proc = Start-Process -FilePath $chrome -PassThru -WindowStyle Hidden -ArgumentList @(
  "--headless=new","--disable-gpu","--no-first-run","--no-default-browser-check",
  "--disable-extensions","--remote-debugging-port=$port","--user-data-dir=$ud","about:blank"
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
    $cts = New-Object System.Threading.CancellationTokenSource
    $buf = New-Object byte[] 262144
    $deadline = (Get-Date).AddSeconds(15)
    while ((Get-Date) -lt $deadline) {
      $seg = New-Object System.ArraySegment[byte] -ArgumentList @(,$buf)
      $sb = New-Object System.Text.StringBuilder
      do {
        $t = $cts.Token
        $res = $ws.ReceiveAsync($seg, $t).Result
        [void]$sb.Append([System.Text.Encoding]::UTF8.GetString($buf, 0, $res.Count))
      } while (-not $res.EndOfMessage)
      $o = $sb.ToString() | ConvertFrom-Json
      if ($o.id -eq $wantId) { return $o }
    }
    return $null
  }

  Send-Cdp "Runtime.enable" $null | Out-Null
  Start-Sleep -Milliseconds 2000

  $expr = if ($ExprFile) { (Get-Content -Raw -LiteralPath $ExprFile).Trim() } else { "JSON.stringify({vw:innerWidth,sw:document.documentElement.scrollWidth,ov:document.documentElement.scrollWidth-innerWidth})" }

  foreach ($w in $Widths) {
    Send-Cdp "Emulation.setDeviceMetricsOverride" @{ width=$w; height=900; deviceScaleFactor=1; mobile=$false } | Out-Null
    Start-Sleep -Milliseconds 800
    $rid = Send-Cdp "Runtime.evaluate" @{ expression=$expr; returnByValue=$true; awaitPromise=$true }
    $o = Wait-Cdp $rid
    if ($o -and $o.result -and $o.result.result) {
      Write-Output ("W=$w => " + $o.result.result.value)
    } elseif ($o -and $o.result -and $o.result.exceptionDetails) {
      Write-Output ("W=$w EXC => " + ($o.result.exceptionDetails | ConvertTo-Json -Depth 6 -Compress))
    } else {
      Write-Output ("W=$w => NO RESPONSE")
    }
  }
} finally {
  if ($ws) { try { $ws.Dispose() } catch {} }
  if ($proc) { Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue }
}
