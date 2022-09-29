# command

```
yarn init -y
```

```
yarn add webpack@4.41.2 webpack-cli@3.3.10 --dev
```

# webpack start

圧縮あり

```
yarn run webpack
```

or

```
npx webpack
```

# webpack.config.js に設定すると下記は不要

圧縮なし

```
yarn run webpack --mode development
```

圧縮なし console.log が関数に変換

```
yarn run webpack --mode development --devtool none
```

圧縮なし webpack.config.js

```
yarn run webpack --mode development --devtool none --config
```

圧縮なし webpack.dev.js

```
yarn run webpack --mode development --devtool none --config .\webpack.dev.js
```

# sass app.scss

```
yarn add --dev sass sass-loader@8.0.0 css-loader@3.2.0 style-loader@1.0.0
```

# postcss.config.js

```
yarn add postcss-loader@3.0.0 autoprefixer@9.7.0 --dev
```

```
yarn add file-loader@4.2.0 --dev
```

# hash

```
yarn add mini-css-extract-plugin@0.8.0 --dev
```

[webpack](https://webpack.js.org/configuration/output/#template-strings)

## ファイル名を hash にできる images/6e78a278553c5942021c2252c2c8dbe5.png

## hash は 画像と html データを別サーバーにして、変更してないデータを更新しなくても表示させれるので、表示を高速にするために使用している

- [contenthash] **差分のみ オススメ**
  - 同時に hash されたデータでも別の hash が振り分けられる、画像ファイルによく使われる
- [chunkhash] **差分のみ オススメ**

  - もし entry point が同じで、html ファイルに css など読み込まれていたら、同じ hash が振り分けられて、entry point が違って、別のファイルであれば、違う hash が振り分けられる

- [hash] **全データ 社内ページなど**
  - データに変更があれば新しい hash が追加される、同時に hash されたデータは、同じ hash が振り分けられる

# Babel

```
yarn add babel-loader@8.0.6 @babel/core@7.4.5 @babel/preset-env@7.4.5 --dev
```

```
yarn add core-js@3.1.4 regenerator-runtime@0.13.3
```

# eslint

```
yarn add eslint@6.6.0 eslint-loader@3.0.2 babel-eslint@10.0.3 --dev
```

## eslint setting 参考:カスタマイズで設定できる

```
yarn run eslint --init
```

# html-webpack-plugin

Html も自動更新

```
yarn add html-webpack-plugin@4.0.0-beta.8 --dev
```

# html-loader@0.5.5

```
yarn add --dev html-loader@0.5.5
```

# clean up deploy folder

```
yarn add rimraf@3.0.0 --dev
```

```
yarn add webpack-merge@4.2.2 --dev
```

# Deploy

- For Developer
  yarn run dev

- For Live
  yarn run build

  # Webpack Mode

  [Webpack Mode](https://webpack.js.org/configuration/mode/)

[Optimize CSS Assets Webpack Plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
[terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)

```
yarn add optimize-css-assets-webpack-plugin@5.0.3 terser-webpack-plugin@2.2.1 --dev
```

[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

```
{
  collapseWhitespace: true,
  keepClosingSlash: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true
}
```

```
yarn add jquery@3.4.1
```

# optimization.splitChunks

app.js sub.js の両方に jQuery などの読み込みデータがある場合、データの変更の度に jQuery も更新される、両方にデータがある分重くなる

複数ページで利用されて、更新されないデータを分割して管理する

# server

[Webpack Devserver](https://webpack.js.org/configuration/dev-server/#root)

```
yarn add webpack-dev-server@3.9.0 --dev
```

```
"dev": "npm run webpack:dev && npm run webpack:server",
"webpack:server": "npx webpack-dev-server --config ./webpack.dev.js",
"webpack:dev": "npm run cleanup && npx webpack --config ./webpack.dev.js",
```

```
yarn run dev で webpack:server と webpack:dev の両方が起動する、一度更新すると後は自動で deploy してくれる
```
