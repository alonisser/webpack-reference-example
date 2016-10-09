/**
 * Created by alonisser on 15/05/16.
 */
//A lot of credit to https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.q4vvpm28n

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin  = require("extract-text-webpack-plugin");
const combineLoaders = require('webpack-combine-loaders');
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    app: './public/main.js',
    vendor: ['jquery', 'lodash', 'react', 'react-dom']
  },
  debug: true,
  output: {
    path: path.resolve(__dirname, 'build'), //used to "build", not really used with the dev-server
    publicPath: "/public/", //Where you uploaded your bundled files. (Relative to server root)
    filename: 'bundle.[hash].js' //hash would be replaced with a .. wait for it.. a hash (cache breaking)
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/, //regex getting js or jsx files
        exclude: path.resolve(__dirname, 'node_modules/'),
        loader: combineLoaders([{
          // test: /.jsx?$/, //regex getting js or jsx files
          loader: 'babel-loader', // the loader name, babel transpiler, can also be just babel
          // exclude: '/node_modules/', //do not transpile node_modules
          query: { //another way to would be using in loader: babel?presets[]=react,presets[]=es2015 using the query params array syntax
            presets: ['es2015', 'react'], // a babel preset is preset of babel plugins loaded together, not a webpack feature
            // compact:false
            //babel configuration can also be stored seperatly in .babelrc file
          }
        }
        ])
      },
      {
        test: /.scss/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        loader: 'style!css!postcss!sass', //would be processed right to left : load sass, run postcss filters, load css as module, inline styles
        //with inline results, but for styles.css file use
        // loader: ETP.extract('style!postcss!css!sass'), //same but extract the html
        // exclude: '/node_modules/', //do not transpile node_modules
      },
      {
        test: /.css/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        loader: 'style!css!postcss', //would be processed right to left : load css via postcss filters, inline styles
        //with inline results, but for styles.css file use
        // loader: ETP.extract('style!css!postcss'), //would be processed right to left : load css, run postcss filters, load css as module, inline styles
        // exclude: '/node_modules/', //do not transpile node_modules
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
      },

    ]
  },
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.EnvironmentPlugin(["NODE_ENV", "API_ADDRESS"]),
    new HtmlWebpackPlugin({
      hash: true,

      template: path.resolve(__dirname, 'src/index.html'),

    }),
    // new ExtractTextPlugin("styles.css")
    // new WebpackBrowserPlugin()
  ]

};
