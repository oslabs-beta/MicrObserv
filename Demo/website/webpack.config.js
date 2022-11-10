//webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    // target: 'electron-renderer',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.css']
    },
    devServer: {
      port: 8083,
    //   proxy: {
    //     "/": "http://localhost:8082"
    //   },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '/client/index.html'),
      }),
    ],
  };