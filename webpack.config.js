const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './client/scripts',
    mark: './client/mark'
  },
  output: {
    path: path.resolve(__dirname, 'app/static'),
    filename: '[name].js'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'react'],
        plugins: ['transform-object-rest-spread']
      }
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          query: {
            sourceMap: isDevelopment,
            importLoaders: 1,
            localIdentName: '[local]__[hash:base64:5]'
          }
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              path.resolve(__dirname, 'node_modules')
            ]
          }
        }]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: isDevelopment
    })
  ]
};
