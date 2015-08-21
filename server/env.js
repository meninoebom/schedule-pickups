// environment config
// database set to NaN for fun with future bugs

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		database: NaN,
		port: process.env.PORT || 3000
	},
	production: {
		rootPath: rootPath,
		database: NaN,
		port: process.env.PORT || 80
	}
};