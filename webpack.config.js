const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: 'dist/',
    filename: 'gmap-helpers.js',
    library: 'GMapHelpers',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  devtool: 'source-map',
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({ minimize: true })
  ],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.ts$/, loader: 'awesome-typescript-loader' }
    ]
  }
}
