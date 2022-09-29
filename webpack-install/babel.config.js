module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env', // https://github.com/browserslist/browserslist
        {
          // targets: {
          //   ie: '11',
          //   chrome: '60',
          // },

          targets: [
            'last 1 version',
            '> 1%',
            'maintained node versions',
            'not dead',
          ],
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
    ],
  };
};

// https://github.com/browserslist/browserslist
// "browserslist": [
//   "last 1 version",
//   "> 1%", // シェアのパーセント
//   "not dead"
// ]
