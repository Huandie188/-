@echo off
echo 正在清理所有项目的依赖...

:: 项目目录列表
set PROJECTS=ved-indicator login course-recommendation audio-analysis-platform cs-learning-path

:: 遍历每个项目目录
for %%p in (%PROJECTS%) do (
    echo 正在处理 %%p 项目...
    
    if exist "%%p\node_modules" (
        echo   - 删除 node_modules 目录...
        rmdir /s /q "%%p\node_modules"
    ) else (
        echo   - node_modules 目录不存在，跳过...
    )
    
    if exist "%%p\.next" (
        echo   - 删除 .next 目录...
        rmdir /s /q "%%p\.next"
    )
    
    if exist "%%p\dist" (
        echo   - 删除 dist 目录...
        rmdir /s /q "%%p\dist"
    )
    
    if exist "%%p\build" (
        echo   - 删除 build 目录...
        rmdir /s /q "%%p\build"
    )
    
    if exist "%%p\package-lock.json" (
        echo   - 删除 package-lock.json...
        del "%%p\package-lock.json"
    )
    
    if exist "%%p\yarn.lock" (
        echo   - 删除 yarn.lock...
        del "%%p\yarn.lock"
    )
    
    if exist "%%p\.yarn\cache" (
        echo   - 删除 Yarn 缓存...
        rmdir /s /q "%%p\.yarn\cache"
    )
    
    echo %%p 项目清理完成！
    echo.
)

echo.
echo 所有项目的依赖已成功清理！
echo 注意：如果您需要重新运行项目，请先执行 npm install 或 yarn install 重新安装依赖。
echo.
pause 