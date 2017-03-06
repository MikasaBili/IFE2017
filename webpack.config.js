const path = require('path') // 处理路径
const webpack = require('webpack')
const autoprefixer = require('autoprefixer') // css 前缀
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const maps = require('./map.js')
const dist = path.resolve(__dirname, './disc')
const view = path.resolve(__dirname, './view')
let plugin = []
for (let map in maps) {
  plugin.push(new HtmlWebpackPlugin({
    template: view + '/' + map + '/index.html',
    filename: map + '/index.html',
    inject: 'body',
    chunks: [map],
    hash: true,
    minify: {
      collapseWhitespace: true
    }
  }))
}
const hotModule = new webpack.HotModuleReplacementPlugin()
const sty = new ExtractTextPlugin('style.css')
plugin.push(hotModule, autoprefixer, sty)
module.exports = {
  entry: maps,
  output: {
    filename: '[name]/[name].js',
    path: dist + '/'
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize', 'less-loader']
        })
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      }
    ]
  },
  devServer: {
    // contentBase: path.resolve(__dirname,'.disc'),
    historyApiFallback: true,
    port: 2345,
    inline: true,
    hot: true
  },
  plugins: plugin
}
