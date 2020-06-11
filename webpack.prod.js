const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        // filename: '[name].[contenthash].js',
        filename: '[name].[hash].js',
        // chunkFilename: '[name].bundle.js', // 决定 non-entry chunk(非入口 chunk) 的名称
        path: path.resolve(__dirname, 'build'),
        // publicPath: '/'
    },
})