const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/js/app.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].bundle-[hash].js' // 在文件名前加上路径，就可以生成文件夹
  },
  module: {
    rules: [
      // css加载
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' }
        ]
      },
      // 图片加载
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'img/',
              useRelativePath: true
            }
          }
        ]
      },
      // babel 加载
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // html-loader 的配置内容
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'), //定义插件读取的模板文件是根目录下的index.html
      filename: 'index.html' //定义通过模板文件新生成的页面名称
    })
  ]
};
