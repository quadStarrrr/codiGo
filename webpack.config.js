const webpack = require('webpack');
const path = require('path');


module.exports = {
  context: path.join(__dirname + '/app'),
  entry: './client/js/index.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/build'),
    publicPath: '/build',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
};
