const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpack = require('webpack')

const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        // dynamicImport: './src/js/dynamic-import.js'
        app: './src/js/index.js',
    },
    resolve: {
        // https://webpack.docschina.org/guides/build-performance/  加快构建速度
        modules: [path.resolve(__dirname, 'node_modules')],
        symlinks: false,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }, 
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            // chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        },
    },
    plugins: [
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        }),
        new webpack.ProvidePlugin({
            _: 'loadsh',
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new MiniCssExtractPlugin({
            ignoreOrder: false
        }),
        new HtmlWebpackPlugin({
            inject: false,
//             collapseWhitespace: true,
//   removeComments: true,
//   removeRedundantAttributes: true,
//   removeScriptTypeAttributes: true,
//   removeStyleLinkTypeAttributes: true,
//   useShortDoctype: true,
            templateContent: ({htmlWebpackPlugin}) => `
<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Progressive Web Application</title>
    <head>
        ${htmlWebpackPlugin.tags.headTags}
    </head>
    <body>
    123 操作一下
    <div></div>
    <p style="font-family:'MyFont'">测试一下</p>
        <h1>Hello World</h1>
        ${htmlWebpackPlugin.tags.bodyTags}
    </body>
</html>
            `
        })
    ],
}