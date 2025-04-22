@echo off  
echo Starting all services...  
  
:: Set Node.js and NPM paths explicitly  
set NODE_PATH="D:\Program Files\nodejs\node.exe"  
set NPM_PATH="D:\Program Files\nodejs\npm.cmd"  
  
:: Start Ved Indicator  
echo Starting Ved Indicator...  
cd ved-indicator  
if %errorlevel% neq 0 (  
    echo ERROR: Could not find ved-indicator directory  
    cd ..  
    goto :skip_ved  
)  
start cmd /k "%NPM_PATH% run dev -- -p 3000"  
cd ..  
:skip_ved  
timeout /t 5  
  
:: Start Login Service  
echo Starting Login Service...  
cd login  
if %errorlevel% neq 0 (  
    echo ERROR: Could not find login directory  
    cd ..  
    goto :skip_login  
)  
start cmd /k "%NPM_PATH% run dev -- -p 3001"  
cd ..  
:skip_login  
timeout /t 5  
  
:: Start Course Recommendation  
echo Starting Course Recommendation...  
cd course-recommendation  
if %errorlevel% neq 0 (  
    echo ERROR: Could not find course-recommendation directory  
    cd ..  
    goto :skip_course  
)  
start cmd /k "%NPM_PATH% run dev -- -p 3002"  
cd ..  
:skip_course  
timeout /t 5  
  
:: Start Audio Analysis Platform  
echo Starting Audio Analysis Platform...  
cd audio-analysis-platform  
if %errorlevel% neq 0 (  
    echo ERROR: Could not find audio-analysis-platform directory  
    cd ..  
    goto :skip_audio  
)  
start cmd /k "%NPM_PATH% run dev -- -p 3003"  
cd ..  
:skip_audio  
timeout /t 5

:: Start CS Learning Path
echo Starting CS Learning Path...
cd cs-learning-path
if %errorlevel% neq 0 (
    echo ERROR: Could not find cs-learning-path directory
    cd ..
    goto :skip_cs_learning
)
start cmd /k "%NPM_PATH% run dev -- -p 3004"
cd ..
:skip_cs_learning
  
echo.  
echo All services started!  
echo Ved Indicator: http://localhost:3000  
echo Login Service: http://localhost:3001  
echo Course Recommendation: http://localhost:3002  
echo Audio Analysis Platform: http://localhost:3003  
echo CS Learning Path: http://localhost:3004
echo.  
echo NOTE: Please check the opened command windows for any error messages.  
echo       If any service failed to start, you may need to start it manually.  
echo.  
pause 
