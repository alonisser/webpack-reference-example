/**
 * Created by alonisser on 15/05/16.
 */
//A lot of credit to https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.q4vvpm28n

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: {
    app: './public/main.js',
    vendor: ['react', 'react-dom']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: "/public/",
    filename: 'bundle.[hash].js'
  },

  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery",
    "$": "jQuery",
    "_": "_",
    "lodash":"_",
    "marked":"marked"
  },


  module: {
    loaders: [
      {
        test: /.jsx?$/, //regex getting js or jsx files
        exclude: path.resolve(__dirname, 'node_modules/'),
        loader: combineLoaders([{

          loader: 'babel-loader',

          query: {
            presets: ['es2015', 'react'],
            compact:false
          }
        },
          {
            loader: 'strip-loader',// cleans debugging perhaps not needed since can be done by uglify?
            query: {
              strip: ['debug', 'console.log']
            }
          }
        ])
      },
      {
        test: /.scss/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
        exclude: path.resolve(__dirname, 'node_modules/'),
        include: path.join(__dirname, 'public/scss')
      },
      {
        test: /.css/,
        loader: ExtractTextPlugin.extract('style','css', 'postcss'),

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
    }), cssnano()]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{'from': 'public'}]),
    new webpack.ProvidePlugin({ //Workaround to support jquery plugins (if needed)
      $: "jquery",
      jQuery: "jquery",
      _:"lodash",
      lodash:"lodash",
      marked:"marked"
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),

    new webpack.optimize.UglifyJsPlugin({mangle: false}),
    new webpack.optimize.DedupePlugin(),
    new webpack.EnvironmentPlugin(["NODE_ENV", "API_ADDRESS"]),
    new HtmlWebpackPlugin({

      template: path.resolve(__dirname, 'src/prod/index.html'),

    }),
    new ExtractTextPlugin("styles.[hash].css")

  ]

};
