//var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const node_env = process.env.NODE_ENV;

// PUBLIC_PATH=/assets/ for server, PUBLIC_PATH=/ for webpack-dev-server
const public_path = process.env.PUBLIC_PATH || '/assets/';

var plugins = [];

plugins.push(
  new webpack.BannerPlugin("qbproj. Enjoy the service.")
);

// plugins.push(
//   new HtmlWebpackPlugin({
//     template: "./app/index.tmpl.html"
//   })
// );

plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(node_env)
    }
  })
)

plugins.push(
  new ExtractTextPlugin("style.css")
);

plugins.push(
    new CleanWebpackPlugin(['public/assets'], {
      //root: `${__dirname}/public`,
      root: `${process.cwd()}/hot`,
      verbose: true, 
      dry: false
      // exclude: ['shared.js']
    })
);

if(node_env == 'production'){
  plugins.push( new webpack.optimize.UglifyJsPlugin({
    //compress: { warnings: false }
    comments: false
  }) )
  plugins.push( new webpack.optimize.OccurenceOrderPlugin() )
}

var entry = [];

plugins.push(
  new webpack.IgnorePlugin(/node-fetch$/)
);

if(node_env !== 'production'){
  entry.push('react-hot-loader/patch');
  // entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
  // //?http://localhost:3000 //?path=http://192.168.77.6:3000/__webpack_hmr
  // //entry.push('webpack/hot/dev-server');
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoErrorsPlugin ()
  );
  entry.push('webpack-dev-server/client?http://0.0.0.0:3333');
  entry.push('webpack/hot/only-dev-server');
}

// entry.push('whatwg-fetch');
entry.push('babel-polyfill');
entry.push('./app/client.js');
// entry.push('./app/auxi.js');

module.exports = 
  {
    // name: 'browser',
    // target: 'node', // default target: 'web'
    devtool: 'cheap-module-eval-source-map',//'source-map',
    entry,
    // entry: [
    //   'webpack-dev-server/client?http://0.0.0.0:3333', // WebpackDevServer host and port
    //   'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    //   './app/client.js'
    // ],
    output: {
      path: `${__dirname}/public/assets/`,
      //filename: 'bundle.js',
      filename: '[name]-[hash].js',
      // publicPath: '/assets/',
      publicPath: public_path,
      hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
      hotUpdateMainFilename: 'hot/[hash].hot-update.json'
    },
    devServer: {
      host: '0.0.0.0',
      port: 3333,
      historyApiFallback: true,
      inline: false,
      hot: true,
      // contentBase: './app/public/assets/',
      proxy: {
        "/api/*": "http://localhost:3000",
        "/login": "http://localhost:3000",
        "/signup": "http://localhost:3000"
      }
    },
    module: {
      loaders: [
  //      {enforce: "pre", test: /\.jsx?$/,  loader: "eslint", exclude: /node_modules/},
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel"
          // loader: "react-hot!babel"
          // query: {
          //   presets: ['es2015', 'react']
          // }
        },
        { test: /\.jsx?$/,  loader: "eslint", exclude: /node_modules/},
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') },
        //{ test: /\.css$/, loader: 'style!css?modules' },
        //{ test: /\.css$/, loader: 'style!css' },
        { test: /\.json$/, loader: "json" },
        { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },
        { test: /\.png$/, loader: "url-loader?limit=100000" },
        { test: /\.jpg$/, loader: "file-loader" }
      ]
    },
    postcss: [
      require('autoprefixer')
    ],
    //eslint: { configFile: '.eslintrc' },
    // plugins
    plugins: plugins.concat(
      new HtmlWebpackPlugin({
        template: "./app/main.tmpl.html",
        filename: "main.html"
      })
    ).concat(
      new HtmlWebpackPlugin({
        template: "./app/webpack-index.tmpl.html",
        filename: "index.html"
      })
    )
  }
