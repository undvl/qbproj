var config = require('./config.json');

var express = require('express')
  , app = express()
  , server = require('http').Server(app)
  , port = process.env.PORT || config[process.env.NODE_ENV||'development'].port;
var bodyParser = require('body-parser');
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://' + config[process.env.NODE_ENV||'development'].mongodb.host
  + ':' + config[process.env.NODE_ENV||'development'].mongodb.port
  + '/' + config[process.env.NODE_ENV||'development'].mongodb.db;
var assert = require('assert');

var routes = require('./routes');

MongoClient.connect(dbUrl, function(err, db) {
  assert.equal(null, err);
  
  //enable "cross-origin resource sharing" for requests from webpack-dev-server
  // if( !(process.env.NODE_ENV=='production') ){
  //   // alternatively can use:
  //   // app.use(function(req, res, next) {
  //   //   res.header("Access-Control-Allow-Origin", "*");
  //   //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   //   next();
  //   // });
    
  //     const cors = require('cors');
  //     app.use(cors());
  // }
  
  app.set('jwtSecret', config.jwtSecret);

  // app.use('/', express.static(path.join(__dirname, 'build')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // app.use('/', express.static(path.join(__dirname, './')));

  // if( !(process.env.NODE_ENV=='production') ){
  //   var webpack = require('webpack')
  //   var webpackDevMiddleware = require('webpack-dev-middleware')
  //   var webpackHotMiddleware = require('webpack-hot-middleware')
  //   var wpConfig = require('./webpack.config')

  //   var compiler = webpack(wpConfig)
  //   app.use(webpackDevMiddleware(compiler, {
  //     noInfo: true,
  //     publicPath: wpConfig.output.publicPath
  //   }));
  //   app.use(webpackHotMiddleware(compiler, {
  //     log: console.log,
  //     path: '/__webpack_hmr',
  //     heartbeat: 10 * 1000
  //   }));
  // }

  app.use('/', express.static(path.join(__dirname, 'public')));

  // api jwt auth by token
  const JwtAuth = require('./srv/jwt_auth');
  const jwtAuth = new JwtAuth(app);

  app.use('/api', jwtAuth.verifyToken);
  //

  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send(err.message);
    }
    next(err);
  });

  routes(app, db);

  require('babel-core/register');
  require('babel-polyfill');

  ['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});

  const fillSrvRendParams = require('./server/fillSrvRendParams');
  const renderHandler = require('./server/srv_render');

  fillSrvRendParams(app);
  app.use(renderHandler);

  // app.get('/*', (req,res) => {
  //   res.sendFile(path.join(__dirname, 'build/index.html'))
  // })

  server.listen(port, function(){
    console.log('listening on ' + port);
  })

});
