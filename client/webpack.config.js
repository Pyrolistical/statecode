module.exports = {
  entry: {
    javascript: './main/entry.jsx',
    html: './main/index.html'
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          cacheDirectory: 'cacheDirectory'
        }
      },
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      }
    ]
  }
};
