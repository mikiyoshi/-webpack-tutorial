// import sub from './sub';
// import './sub';
import 'js/sub'; // webpack.common..js の modules で設定
// import '../scss/app.scss';
// import '@scss/app.scss'; // webpack.common..js の resolve で設定
// import '@scss/app'; // webpack.common..js の extensions で .scss 削除できる
// import '@scss/app'; // jsconfig.json で自動補完を設定すると、フォルダー内のデータをリスト表示してくれる
setTimeout(() => {
  // import('js/sub'); // jsconfig.json で自動補完を設定すると、フォルダー内のデータをリスト表示してくれる
  import('@scss/app'); // jsconfig.json で自動補完を設定すると、フォルダー内のデータをリスト表示してくれる
}, 2000);
// import utils from 'js/utils'; // 不要なコード、 React の自動保管で入力すると、勝手に追加される
// import 'regenerator-runtime'; // これを使うと書き出しデータが重くなる // 対処法：babel.config.js に useBuiltIns: 'usage', corejs: 3, // https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
// import 'core-js'; // これを使うと書き出しデータが重くなる // 対処法：babel.config.js に useBuiltIns: 'usage', corejs: 3,
// import jQuery from './node_modules/jquery'
// import jQuery from 'jquery' // webpack.common..js の modules で設定

// This is ES6 format // babel-loader convert to before ES6 version
// ES5 is for ie11 // ES6 is for current browser
const init = async() => {
  console.log('this is a main js file');
  await asyncFn();
  jQuery();
  utils.log('Hello in from app.js');
};

// This is ES7
async function asyncFn() {
  console.log([1, 2, 3].includes(0));
  console.log("I'm async function");
}

init();
