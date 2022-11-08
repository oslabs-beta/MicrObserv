//webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const electronConfig = {
  entry: './main.js',
  target: 'electron-main',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css']
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)?$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
    }]
  }
};

const reactConfig = {
  entry: './src/App.tsx',
  // target: 'electron-renderer',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css']
  },
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      "/": "http://localhost:3000"
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
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
    }),
  ],
};


module.exports = [
  // electronConfig,
  reactConfig
];
