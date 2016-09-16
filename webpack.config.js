const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.ts',
  output: {
    path: 'dist/',
    filename: isProd ? 'gmap-helpers.min.js' : 'gmap-helpers.js',
    library: 'GMapHelpers',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  devtool: 'source-map',
  plugins: isProd
    ? [new webpack.optimize.UglifyJsPlugin({ minimize: true })]
    : [],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.ts$/, loader: 'awesome-typescript-loader' }
    ]
  }
}
