
const path = require('path')

const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports={
    mode: "development",
    // entry: './src/js/index.js',
    entry: {
        // app: './src/js/index.js',
        // another: './src/js/another-moudle.js',
        // print: './src/js/print.js',
        dynamicImport: './src/js/dynamic-import.js'
    },
    // devtool: 'inline-source-map',
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
    <title>Caching</title>
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