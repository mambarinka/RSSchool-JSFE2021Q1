const resolve = require('path').resolve;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const  {CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': resolve(__dirname, '../src/'),
      images: resolve(__dirname, '../assets/images'),
      fonts: resolve(__dirname, '../assets/fonts'),
    },
  },
  output: {
    filename: 'static/js/[name].[hash].js',
    path: resolve(__dirname, '../', 'build'),
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, '../', 'public'),
    publicPath: '/',
    compress: true,
    port: 8080,
    watchContentBase: true,
    progress: true,
    disableHostCheck: true,
    clientLogLevel: 'none',
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, '../', 'public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css',
      allChunks: true,
    }),
    new CopyWebpackPlugin(
      { patterns: [{ from: 'public' }] },
      {
        ignore: ['*.html'],
      }
    ),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new ESLintPlugin({ extensions: ['ts', 'tsx', 'js'] })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.[tj]s(x?)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/i,
        exclude: [/node_modules/],
        include: resolve(__dirname, '../src'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
              localsConvention: 'camelCase',
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|svg|png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;