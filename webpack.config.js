var BSync = require('browser-sync-webpack-plugin');
var path = require('path');
module.exports = {
  entry: {
    _partials: [
      './public/src/js/partials/partial-list.js'
    ],
    app: ['./public/src/js/App.js']
  },
  output: {
    path: path.resolve(__dirname,'public/dist/js'),
    filename: '[name].bundle.js'
  },
  watch: true,
  plugins: [
    new BSync({
      host: 'localhost',
      port: 3000,
      ghostMode: false,
      files: ["views/**/*.hbs", "public/**/*.*", "!public/src/scss", "!public/src/js"],
      proxy: "localhost:80",
    })
  ]
};