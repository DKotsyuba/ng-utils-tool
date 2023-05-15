const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const root = path.dirname(__dirname);
const updateFile = fs.readFileSync(path.join(root, 'chrome', 'templates', 'update.template.xml')).toString();
const manifestStr = fs.readFileSync(path.join(root, 'angular', 'dist', 'manifest.json')).toString();
const manifest = JSON.parse(manifestStr);
const updateXml = ejs.render(updateFile, { version: manifest.version });
fs.writeFileSync(path.join(root, 'release', 'update.xml'), updateXml);
