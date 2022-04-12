// craco.config.js
const pxtorem = require("postcss-pxtorem");

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 16,
          propList: ['*'],
          unitPrecision: 5,
          minPixelValue: 0,
          exclude: ['node_modules'],
        }),
      ],
    },
  },
}