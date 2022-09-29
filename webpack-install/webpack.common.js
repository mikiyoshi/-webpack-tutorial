const path = require('path');
const loader = require('sass-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
const { ProvidePlugin } = require('webpack');

module.exports = ({ outputFile, assetFile }) => ({
  entry: { app: './src/js/app.js', sub: './src/js/sub.js' }, // app.js import sub from './src/sub.js'
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: `${outputFile}.js`, // バラバラの時に便利
    chunkFilename: `${outputFile}.js`, // yarn run dev では 0.js などで自動生成される // yarn run build では hash が付加されたファイル名になる
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true, // 自動で修正してくれる
        },
      },
      // { // 上と同じ
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [MiniCssExtractPlugin.loader, 'babel-loader', 'eslint-loader'], // 下から上(右から左)順番に処理される
      // },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ], // 下から上(右から左)順番に処理される
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/, // jpe?g は jpeg か jpg の両方に対応 // woff2? と ttf と eot はフォントの拡張子
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${assetFile}.[ext]`, // ファイル名を hash にできる images/6e78a278553c5942021c2252c2c8dbe5.png // hash は ウェブサーバーを高速にするために使用している
              outputPath: 'images', // 書き出し先フォルダー
              publicPath: 'images', // publicPath: 'http://127.0.0.1:5500/images' なども可能、画像のサーバーが違うときに使う
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'], // HtmlWebpackPlugin と一緒に使う
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // css を分離する
      filename: `${outputFile}.css`,
    }),
    // new webpack.ProvidePlugin({
    //   jQuery: 'jquery',
    //   $: 'jquery',
    // }),
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      utils: [path.resolve(__dirname, 'src/js/utils'), 'default'],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // これは全て同期処理で読み込まれる // async はダイナミックインポート import ('./src/abc.css') のみ、all は関係なく処理する import ('./src/abc.css') と import './src/abc.css' の両方
      minSize: 0,
      cacheGroups: {
        vendors: {
          name: 'venders', // jQuery のみ共通部分として分割されて、app.js sub.js には jQuery は切り離されて、更新されない
          test: /node_modules/,
          priority: -10,
        },
        utils: {
          name: 'utils',
          // test: /src[\\/]js[\\/]utils/, // [\\/] は / の正規表現
          test: /src[\\/]/, // js と css も両方対象になる // [\\/] は / の正規表現
          // test: /src[\\/]js/, // js を追加すると js だけ対象になるので、css と分けることができる
          // chunks: 'async', // これは非同期処理で読み込まれる、重い処理を非同期にして、表示を軽くする
          chunks: 'initial', // これは非同期処理はバンドルしなくなる // 非同期処理は 0.js などでバンドルされる
        },
        default: false,
      },
    },
  },
  resolve: {
    alias: {
      // scss: path.resolve(__dirname, 'src/scss'),
      // images: path.resolve(__dirname, 'src/images'),
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@imgs': path.resolve(__dirname, 'src/images'),
    },
    extensions: ['.js', '.scss'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
});
