const fs = require('fs');
const path = require('path');

const root = path.dirname(path.dirname(__filename));
const manifestPath = path.join(root, 'angular', 'dist', 'manifest.json');

const manifestString = fs.readFileSync(manifestPath).toString();
const manifestObject = JSON.parse(manifestString);
manifestObject.version_name = new Date().toISOString()
const newManifestString = JSON.stringify(manifestObject)
fs.writeFileSync(manifestPath, newManifestString)
