Remove-Item -r build
Set-Location ../workspace
npm run build --prod
Copy-Item -r build ../backend/
Set-Location ../backend