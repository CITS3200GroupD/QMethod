const express = require('express'),
  authRoutes = express.Router(),
  cookieParser = require('cookie-parser'),
  utils = require('../utils/secure.utils'),
  settings = require('../../config/Settings');
express();

/***
 * Authentication API
 * ============================================================================
 * See TODO: Gitbook documentation
 * ============================================================================
 * Credit to:
 * https://www.youtube.com/watch?v=o2RBvg7Bb9A
 * https://angular-university.io/lesson/server-side-user-identification
 * https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
 * http://jasonwatmore.com/post/2018/05/23/angular-6-jwt-authentication-example-tutorial
 */

authRoutes.use(cookieParser());     // init Cookie-Parser

/**
 * Authenticate a username/password combination versus server-side environment variables
 */
authRoutes.route('/').post( (req, res) => {
  // if sent user = [admin] and sent password = [password] generate JWT key (encrypt with secret keys)
  if (req.body.username === process.env['USERNAME'] && req.body.password === process.env['PASSWORD']) {
    let token = utils.generate_jwt();
    // Note: For production, cookie is only sent over secured (HTTPS) channel.
    let headers = {};
    const expire_t = settings.EXPIRE_TIME * 1000;
    if (!req.secure && req.headers['x-forwarded-proto'] !== 'https') {
      headers = { httpOnly: true, sameSite: true, maxAge: expire_t  };
      res.cookie('SESSION_ID', token, headers).status(200).json('User/Password Authenticated');
    } else {
      headers = { httpOnly: true, secure: true, sameSite: true, maxAge: expire_t  };
      res.cookie('SESSION_ID', token, headers).status(200).json('User/Password Authenticated');
    }
  }
  else {
    res.status(400).send('no token'); // Placeholder response
  }
});

/** Check token for validity*/
authRoutes.route('/token').get( (req, res, next) => {
  utils.get_req_auth(req, res, next);
  if (req.auth === process.env['USERNAME']) {
    res.status(200).json('Authenticated Token');
  }
  else {
    res.status(400).json('Invalid token'); // Placeholder response
  }
});

/** Set expired cookie */
authRoutes.route('/remove_token').get( (req, res) => {
  if (req.cookies && req.cookies['SESSION_ID']) {
    res.clearCookie('SESSION_ID');
  }
  res.status(200).json('Expired Cookie');
});

module.exports = authRoutes;
