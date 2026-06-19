@echo off
title FUTURISTIC PORTFOLIO UPLINK SYSTEM
color 0E

echo ==========================================================================
echo           FUTURISTIC 3D PORTFOLIO UPLINK ENGINE LAUNCHER
echo ==========================================================================
echo [STATUS] Checking local runtime environment...

java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java SDK was not detected in your PATH!
    echo [ERROR] Please install Java JDK 17+ or 24+ and try again.
    pause
    exit /b
)

echo [STATUS] Java SE platform discovered successfully!
echo [STATUS] Starting Port 8080 network socket...
echo [STATUS] COMPILING AND EXECUTING PORTFOLIO SERVER MODULES...
echo --------------------------------------------------------------------------
echo NOTE: To shutdown the portfolio uplink, close this terminal window (Ctrl+C).
echo --------------------------------------------------------------------------

:: Open browser automatically in 2 seconds in a separate process
start /b cmd /c "ping 127.0.0.1 -n 3 >nul && start http://localhost:8080"

:: Launch the Java server (compiles & runs single-source-file on the fly in Java 11+)
java PortfolioServer.java

pause
