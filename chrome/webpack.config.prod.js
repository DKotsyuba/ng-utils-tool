const { optimize } = require('webpack');
const base = require('./webpack.config.base');

module.exports = {
    ...base,
    mode: 'production',
    plugins: [
        ...base.plugins,
        new optimize.AggressiveMergingPlugin(),
    ]
}
