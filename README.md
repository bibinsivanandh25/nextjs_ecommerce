## MrMrsCart

## Getting started

Prerequisites:

- Node (> v12)
- npm

Install dependencies:

bash
npm i -f

## To run localy

bash
npm run dev

APP_SERVER = "http://localhost:3010"

## To depoly a new development build

bash
npm run build

If correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

App will be started at 3010 port

APP_SERVER = "http://10.10.30.20:3010"
BACKEND_SERVER = "http://10.10.30.20:8765"

## To depoly a new development build

bash
npm run build:staging

If correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

App will be started at 3010 port

APP_SERVER = "http://10.10.30.21:3010"
BACKEND_SERVER = "http://10.10.30.21:8765"

## To run sonarqube
sonar-scanner.bat -D"sonar.projectKey=MrMrsCart" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.login=f39cd7bb1b8820ed369f732dab5b25587805a82d"