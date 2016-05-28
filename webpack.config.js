/**
 * Created by alonisser on 15/05/16.
 */
//A lot of credit to https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.q4vvpm28n

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ETP = require("extract-text-webpack-plugin");


module.exports = {
  entry: {
    app: './public/main.js',
    vendor: ['jquery', 'lodash', 'react', 'react-dom']
  },
  debug: true,
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: "/public/",
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/, //regex getting js or jsx files
        loader: 'babel-loader', // the loader name, babel transpiler, can also be just babel
        exclude: '/node_modules/', //do not transpile node_modules
        query: { //another way to would be using in loader: babel?presets[]=react,presets[]=es2015 using the query params array syntax
          presets: ['es2015', 'react'] // a babel preset is preset of babel plugins loaded together, not a webpack feature
          //babel configuration can also be stored seperatly in .babelrc file
        }
      },
      {
        test: /.scss/,
        loader: 'style!postcss!css!sass', //would be processed right to left : load sass, run postcss filters, load css as module, inline styles
        //with inline results, but for styles.css file use
        // loader: ETP.extract('style!postcss!css!sass'), //would be processed right to left : load sass, run postcss filters, load css as module, inline styles
        exclude: '/node_modules/', //do not transpile node_modules
      },
      {
        test: /.css/,
        loader: 'style!css!postcss', //would be processed right to left : load css via postcss filters, inline styles
        //with inline results, but for styles.css file use
        // loader: ETP.extract('style!css!postcss'), //would be processed right to left : load css, run postcss filters, load css as module, inline styles
        exclude: '/node_modules/', //do not transpile node_modules
        include: path.join(__dirname, 'public/css')
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'image-webpack',
        query: {
          progressive: true,
          optimizationLevel: 3,
          interlaced: false
        }
      }
    ]
  },
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
  ]

};
