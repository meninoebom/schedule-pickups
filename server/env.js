// environment config

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		database: 'postgres://user:pass@example.com:5432/dbname',	// 'postgres://user:pass@example.com:5432/dbname'
		port: process.env.PORT || 3000
	},
	production: {
		rootPath: rootPath,
		// heroku addons:create heroku-postgresql:hobby-basic
		// heroku config -s | grep HEROKU_POSTGRESQL
		database: 'postgres://gcnxnpeyfgagrt:k5SVZEGTIHTfaaRfl_Jhm4tCF_@ec2-54-83-58-191.compute-1.amazonaws.com:5432/db69q95it9o79k',
		port: process.env.PORT || 80
	}
};