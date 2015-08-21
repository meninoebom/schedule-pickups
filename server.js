
var express = require('express'),
	bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Sequelize = require('sequelize'),
	app = express();

// ENVIRONMENT CONFIG
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	envConfig = require('./server/env')[env];

// DATABASE CONFIG
if(env === 'development'){
	var db_username = null;
	var db_password = null;

	var sequelize = new Sequelize('database', db_username, db_password, {
	  host: 'localhost',
	  dialect: 'postgres'
	});
} else if (env === 'production'){
	var sequelize = new Sequelize(envConfig.database);
}

// EXPRESS CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

// ROUTES
require('./server/routes')(app);

// Start server
app.listen(envConfig.port, function(){
  console.log('Server listening on port ' + envConfig.port)
});

