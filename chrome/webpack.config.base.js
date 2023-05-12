const { CheckerPlugin } = require('awesome-typescript-loader');
const { join } = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        contentPage: join(__dirname, 'src/contentPage.ts'),
        serviceWorker: join(__dirname, 'src/serviceWorker.ts'),
        inpage: join(__dirname, 'src/inpage.ts')
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        path: join(__dirname, '../angular/dist'),
        filename: '[name].js'
    },
    plugins: [new CheckerPlugin(), new NodePolyfillPlugin()],
    node: {
        global: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false
        }
    }
};
