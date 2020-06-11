const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    output: {
        // filename: '[name].[contenthash].js',
        filename: '[name].[hash].js',
        // chunkFilename: '[name].bundle.js', // 决定 non-entry chunk(非入口 chunk) 的名称
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/'
    },
})