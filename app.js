/*
 * Module dependencies
 */
var  express = require('express'),
        path = require('path'),
  bodyParser = require('body-parser'),
          fs = require('fs'),
      busboy = require('connect-busboy'),
      routes = require('./routes/index'), // user web routes
publicRoutes = require('./routes/public'), // user web routes
      config = require('./modules/config'),
  middleware = require('./modules/middleware');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(busboy());

app.use(express.static(__dirname + '/public'));

app.get('/',routes.index);
app.get('/analyze',publicRoutes.emptyPage);
app.post('/analyze',middleware.trackTime, routes.csvAnalyze);
app.get('/stats',routes.appStatistic);

app.listen(config.httpPort);