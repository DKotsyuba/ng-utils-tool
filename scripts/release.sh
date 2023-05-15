npm run build:production
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --pack-extension='./angular/dist' --pack-extension-key='./scripts/key.pem'
rm -rf ./release/extension.crx
rm -rf ./release/update.xml
rm -rf ./release/extension.zip
mv ./angular/dist.crx ./release/extension.crx
npm run pack
mv ./extension.zip ./release/extension.zip
npm run build-update
npm run build-mac-policy
firebase deploy
