@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

set "REMOTE=ivanlovo"
set "BRANCH=main"
set "HAS_CHANGES="
set "COMMIT_MSG=%*"

where git >nul 2>nul
if errorlevel 1 (
  echo ERROR: Git is not installed or is not available in PATH.
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm is not installed or is not available in PATH.
  exit /b 1
)

git rev-parse --show-toplevel >nul 2>nul
if errorlevel 1 (
  echo ERROR: This script must run inside the website Git repository.
  exit /b 1
)

git remote get-url %REMOTE% >nul 2>nul
if errorlevel 1 (
  echo ERROR: Git remote "%REMOTE%" was not found.
  echo Add it with:
  echo git remote add %REMOTE% https://github.com/lobo-creator/website-ivanlovo.git
  exit /b 1
)

echo.
echo Building website...
call npm run build
if errorlevel 1 (
  echo.
  echo ERROR: Build failed. Nothing was pushed.
  exit /b 1
)

for /f "delims=" %%S in ('git status --short') do set "HAS_CHANGES=1"

if defined HAS_CHANGES (
  if not defined COMMIT_MSG (
    for /f %%T in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd-HHmmss"') do set "STAMP=%%T"
    set "COMMIT_MSG=Update website !STAMP!"
  )

  echo.
  echo Committing modified files...
  git add -A
  if errorlevel 1 exit /b 1

  git commit -m "!COMMIT_MSG!"
  if errorlevel 1 exit /b 1
) else (
  echo.
  echo No modified files to commit.
)

echo.
echo Pushing to %REMOTE%/%BRANCH%...
git push %REMOTE% HEAD:%BRANCH%
if errorlevel 1 (
  echo.
  echo ERROR: Push failed.
  exit /b 1
)

echo.
echo Done. GitHub Pages will publish ivanlovo.com after the workflow finishes.
exit /b 0
