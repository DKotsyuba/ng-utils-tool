const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { APP_ID, UPDATE_URL } = require('../variables')


const root = path.dirname(__dirname);
const policy = fs.readFileSync(path.join(root, 'chrome', 'templates', 'macos-chrome-extension-policy.template.xml')).toString();
const newPolicy = ejs.render(policy, { appId: APP_ID, updateUrl: (UPDATE_URL + '*') });
fs.writeFileSync(path.join(root, 'release', 'policy.mobileconfig'), newPolicy);
