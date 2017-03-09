const path = require('path') // 处理路径
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const maps = require('./map.js')
const dist = path.resolve(__dirname, './disc')
const view = path.resolve(__dirname, './view')
let plugin = []
for (let map in maps) {
  plugin.push(new HtmlWebpackPlugin({
    template: view + '/' + map + '/index.html',
    filename: 'IFE2017' + '/' + map + '/index.html',
    inject: 'body',
    chunks: [map],
    hash: true,
    minify: {
      collapseWhitespace: true
    }
  }))
}
const hotModule = new webpack.HotModuleReplacementPlugin()
const sty = new ExtractTextPlugin('IFE2017/[name]/[name].css')
plugin.push(hotModule, sty)
module.exports = {
  entry: maps,
  output: {
    filename: 'IFE2017/[name]/[name].js',
    path: dist + '/',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 2
            }
          }, 'less-loader', 'postcss-loader']
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
        loader: 'url-loader?limit=8192&name=IFE2017/images/[name].[ext]'
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
