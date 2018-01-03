const env = process.env.NODE_ENV
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        rules: [{
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['latest', { modules: false }]
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader?limit=100000',
                    options: {
                        name: '/[name].[ext]',
                    }
                }],
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new UglifyJsPlugin({
            // ...
        }),
        new HtmlWebpackPlugin({
            title: 'Horoscope',
            template: 'index.html',
        })
    ] 
}
