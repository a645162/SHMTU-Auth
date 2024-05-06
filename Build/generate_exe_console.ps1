# https://pyinstaller.org/en/stable/usage.html

$DebugMode = $false

$parentProcess = (Get-WmiObject -Class Win32_Process -Filter "ProcessId =$PID").ParentProcessId
$parentProcessName = (Get-WmiObject -Class Win32_Process -Filter "ProcessId =$parentProcess").Name
# Check is include "pycharm"
if ($parentProcessName -like "pycharm*.exe")
{
    Write-Host "Running in PyCharm"
    $DebugMode = $true
}

# Check requirements.txt is exist
if (-not (Test-Path "requirements.txt"))
{
    # Go to parent directory
    Set-Location ..
}

# Check again
if (-not (Test-Path "requirements.txt"))
{
    Write-Host "File requirements.txt not found"
    exit
}

# Save Current Loaction
$baseLocation = Get-Location

Write-Host "Installing requirements..."

if ($DebugMode)
{
    Write-Host "Running in Debug Mode"
    Write-Host "Passing the requirements installation..."
}
else
{
    Write-Host "Running in Release Mode"
    # $null = Read-Host "Press Enter to Continue"
    Write-Host "Installing requirements..."
    pip install -r requirements.txt > $null
    pip install -r r-dev-requirements.txt > $null
}

$project_name = "shmtu_auth"
$profile_name = "windows_console"
$project_name_with_profile = "$project_name" + "_" + "$profile_name"

$srcLocation = "$baseLocation\$project_name"
$outputLocation = "$baseLocation\Build\$project_name_with_profile"
$tmpLocation = "$outputLocation\tmp"

Write-Host "src Location: $srcLocation"
Write-Host "output Location: $outputLocation"
Write-Host "tmp Location: $tmpLocation"

Write-Host "Building the executable..."

Set-Location $srcLocation

pyinstaller `
    --onefile `
    --console `
    --strip `
    --noupx `
    --icon ..\Assets\Icon\icons\Icon.ico `
    --name $project_name_with_profile `
    --distpath $outputLocation `
    --workpath $tmpLocation `
    .\main_pyinstaller.py

Write-Host "Build Completed"

# Clean up
Write-Host "Cleaning up..."

# Remove File "shmtu_auth.spec"
Remove-Item -Recurse -Force "$srcLocation\$project_name_with_profile.spec"

# Remove Temp Files
Remove-Item -Recurse -Force $tmpLocation

Write-Host "Cleanup Completed"

# Restore Location
Write-Host "Restored Location"
Set-Location $baseLocation

Write-Host "Executable is located at $outputLocation"
Write-Host "Build Completed!!!"
