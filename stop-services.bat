@echo off  
echo Stopping all services...  
  
:: Stop services on specific ports  
echo Stopping Ved Indicator (port 3000)...  
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /f /pid %%a 2>nul  
  
echo Stopping Login Service (port 3001)...  
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do taskkill /f /pid %%a 2>nul  
  
echo Stopping Course Recommendation (port 3002)...  
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3002" ^| find "LISTENING"') do taskkill /f /pid %%a 2>nul  
  
echo Stopping Audio Analysis Platform (port 3003)...  
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3003" ^| find "LISTENING"') do taskkill /f /pid %%a 2>nul  
  
echo.  
echo All services stopped!  
echo.  
pause 
