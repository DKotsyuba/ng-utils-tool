const crx = require("crx-webpack-plugin");
module.exports = {
    plugins: [
        new crx({
            keyFile: 'key.pem',
            contentPath: './angular/dist',
            outputPath: './release',
            name: 'chrome-ext'
        })
    ]
}
