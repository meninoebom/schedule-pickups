var express = require('express'),
	path = require('path'),
	request = require('request'),
	jwt = require('jwt-simple'),
	moment = require('moment'),
	config = {},
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router(),
	router = express.Router();

// set facebook secret token
config.FACEBOOK_SECRET = process.env.FACEBOOK_SECRET || '6d85dc0b8da4ef76f71f3994c8c61ecd';

module.exports = function(app){	

	app.post('/auth/facebook', function(req, res) {
		var accessTokenUrl = 'https://graph.facebook.com/v2.3/oauth/access_token';
		var graphApiUrl = 'https://graph.facebook.com/v2.3/me';

		// get data from request
		var params = {
			code: req.body.code,
			client_id: req.body.clientId,
			client_secret: config.FACEBOOK_SECRET,
			redirect_uri: req.body.redirectUri
		};

		console.log(params);

		// Step 1. Exchange authorization code for access token.
		request.get({ 
			url: accessTokenUrl,
			qs: params, 
			json: true 
		}, function(err, response, accessToken) {
			if (response.statusCode !== 200) {
			  return res.status(500).send({ message: accessToken.error.message });
			}

			console.log('------------');
			console.log(accessToken);
			console.log('------------');

			// Step 2. Retrieve profile information about the current user.
			request.get({
				url: graphApiUrl,
				qs: accessToken,
				json: true 
			}, function(err, response, profile) {
				if (response.statusCode !== 200) {
					return res.status(500).send({ message: profile.error.message });
				}

				res.send({
					token: accessToken,
					profile: profile
				});
		    });
		});
	});

	// angularjs catch all route
	router.get('/*', function(req, res) {
		res.sendFile(rootPath + 'public/index.html', { user: req.user });
	});

	app.use('/api', apiRouter);	// haven't built any api yet
	app.use('/', router);
};


// middleware
function isAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' });
  }

  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.tokenSecret);
  var now = moment().unix();

  if (now > payload.exp) {
    return res.status(401).send({ message: 'Token has expired.' });
  }

  console.log(payload);
  next();
}

// generate a json web token
function createToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  };

  return jwt.encode(payload, config.tokenSecret);
}