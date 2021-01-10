const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  target: 'node',
  output: {
    filename: 'bundle.js',
    library: 'ArmTemplateGenerator',
    path: path.resolve(__dirname, 'dist')
  }
};