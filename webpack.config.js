var path = require('path');
var webpack = require('webpack');
var npm_dir = path.join(__dirname, 'node_modules/');

var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    if (name !== 'react-dom' && name !== 'bootstrap.css'  && name !== 'jquery'  && name !== 'bootstrap') {
      this.module.noParse.push(new RegExp(path));
    }
  },
  entry: {
    app: [path.join(__dirname, 'app/app.jsx')],
    vendors: ['jquery' ,'react', 'react-dom', 'bootstrap', 'bootstrap.css']
  },
  output: { path: path.join(__dirname, 'build'), filename: 'bundle.js' },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ],
    noParse: []
  },
  resolve: {
    alias: {}
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  devtool: 'eval-source-map'
};
config.addVendor('jquery', path.resolve(npm_dir + 'jquery/dist/jquery.min.js'));
config.addVendor('react', path.resolve(npm_dir + 'react/dist/react.min.js'));
config.addVendor('react-dom', path.resolve(npm_dir + 'react-dom/dist/react-dom.min.js'));
config.addVendor('bootstrap', path.resolve(npm_dir + 'bootstrap/dist/js/bootstrap.min.js'));
config.addVendor('bootstrap.css', path.resolve(npm_dir + 'bootstrap/dist/css/bootstrap.min.css'));

module.exports = config;
