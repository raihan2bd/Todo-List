const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: "./src/index.js",
  },
  devServer: {
    static: "./dist"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  plugins: [
     new HtmlWebpackPlugin({
      title: "Webpack Setup",
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new MiniCssExtractPlugin()
  ],
  devtool: 'inline-source-map',

  optimization: {
    runtimeChunk: 'single',
  },
}