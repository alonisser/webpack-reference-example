/**
 * Created by alonisser on 15/05/16.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './public/scripts/main.js',
    vendor:['jquery', 'lodash', 'react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: "/public/",
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
  ]

};
