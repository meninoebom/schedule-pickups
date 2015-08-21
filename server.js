
var express = require('express'),
	bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
	app = express();

// ENVIRONMENT CONFIG
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	envConfig = require('./server/env')[env];

// EXPRESS CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

// GRANT CONFIG
var Grant = require('grant-express'),
	grant = new Grant(require('./server/grantConfig.json'));
app.use(grant);
app.use(session({
  name: 'grant', secret: 'very secret',
  saveUninitialized: true, resave: true
}));

// ROUTES
require('./server/routes')(app);

// Start server
app.listen(envConfig.port, function(){
  console.log('Server listening on port ' + envConfig.port)
});