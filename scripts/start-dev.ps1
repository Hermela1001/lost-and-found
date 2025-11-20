<#
Starts the backend (Rails) and frontend (Vite) in separate PowerShell windows.

Usage (from repo root in PowerShell):
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; .\scripts\start-dev.ps1

This script does not replace using WSL/Docker. It is a convenience for Windows
development when Ruby and Node are installed natively.
#>

# Resolve repo root and key dirs
$scriptPath = $MyInvocation.MyCommand.Path
$scriptDir = Split-Path -Parent $scriptPath
# repoRoot is the parent of the scripts directory
$repoRoot = Split-Path -Parent $scriptDir
$backendDir = Join-Path $repoRoot 'lost_found_backend'
$frontendDir = Join-Path $repoRoot 'frontend'

Write-Host "scriptPath: $scriptPath"
Write-Host "scriptDir: $scriptDir"
Write-Host "Repo root: $repoRoot"
Write-Host "backendDir: $backendDir"
Write-Host "frontendDir: $frontendDir"
Write-Host "Starting backend in new window..."

# Build the command that will run in the backend window

# Compose a single-line command for backend to avoid heredoc/expansion issues
$backendCmd = "Set-Location -LiteralPath '$backendDir'; if (-not (Test-Path -Path .\\storage -PathType Container)) { New-Item -ItemType Directory -Path .\\storage | Out-Null }; Write-Host 'Installing gems (this may take a while)...'; bundle install; Write-Host 'Preparing database...'; bin\\rails db:create db:migrate db:seed || Write-Host 'db:create/migrate/seed may have failed or already run.'; Write-Host 'Starting Rails server on port 3000...'; bin\\rails server -b 0.0.0.0 -p 3000"

Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoExit", "-NoProfile", "-Command", $backendCmd) -WindowStyle Normal

Start-Sleep -Seconds 1
Write-Host "Starting frontend in new window..."

# Compose a single-line command for frontend
$frontendCmd = "Set-Location -LiteralPath '$frontendDir'; Write-Host 'Installing npm dependencies (if needed)...'; npm install; [Environment]::SetEnvironmentVariable('VITE_API_URL','http://localhost:3000','Process'); Write-Host 'Starting Vite dev server...'; npm run dev"

Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoExit", "-NoProfile", "-Command", $frontendCmd) -WindowStyle Normal

Write-Host "Started backend and frontend windows. Check their consoles for logs/errors."
