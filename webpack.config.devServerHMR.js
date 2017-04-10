//var path = require('path');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const node_env = process.env.NODE_ENV;

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

if(node_env == 'production'){
  plugins.push( new webpack.optimize.UglifyJsPlugin({
    //compress: { warnings: false }
    comments: false
  }) )
  plugins.push( new webpack.optimize.OccurenceOrderPlugin() )
}

if(node_env !== 'production'){
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

var entry = [];

if(node_env !== 'production'){
  entry.push('webpack-dev-server/client?http://0.0.0.0:3333');
  entry.push('webpack/hot/only-dev-server');
}

entry.push('./app/client.js');

module.exports = 
  {
    // name: 'browser',
    //devtool: 'source-map',
    entry,
    // entry: [
    //   'webpack-dev-server/client?http://0.0.0.0:3333', // WebpackDevServer host and port
    //   'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    //   './app/client.js'
    // ],
    output: {
      path: `${__dirname}/public/assets/`,
      filename: 'bundle.js',
      //filename: '[name]-[hash].js'
      publicPath: '/'
    },
    devServer: {
      host: '0.0.0.0',
      port: 3333,
      historyApiFallback: true,
      inline: false,
      hot: true,
      //contentBase: './app/public/assets/',
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
          loader: "react-hot!babel"
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
        template: "./app/client.tmpl.html"
      })
    )
  }
