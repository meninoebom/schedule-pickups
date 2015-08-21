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
		database: '',
		port: process.env.PORT || 80
	}
};