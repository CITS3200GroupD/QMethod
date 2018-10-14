const express = require('express');
const authRoutes = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
express();

const secret_key = fs.readFileSync('./config/private.key'); // placeholder key

process.env['USERNAME'] = 'admin'; // TODO: Comment this out
process.env['PASSWORD'] = 'password'; // TODO: Comment this out

// Respond with secure cookie
// https://www.youtube.com/watch?v=o2RBvg7Bb9A
// https://angular-university.io/lesson/server-side-user-identification
// JWT Authentication with Middleware
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
// Angular 6 JWT (Local Storage)
// http://jasonwatmore.com/post/2018/05/23/angular-6-jwt-authentication-example-tutorial

/** Route called on login, check username/password data and return token */
authRoutes.route('/').post( (req, res) => {
  // if sent user = [admin] and sent password = [password] generate JWT key (encrypt with secret keys)
  if (req.body.username === process.env['USERNAME'] && req.body.password === process.env['PASSWORD']) {
    let token = generate_jwt();
    // Note: For production, cookie is only sent over secured (HTTPS) channel.
    let headers = {};
    if (process.argv[2] === 'deploy') {
      headers = { httpOnly: true, secure: true, sameSite: true };
      res.cookie('SESSION_ID', token, headers).status(200).json('User/Password Authenticated');
    } else {
      res.cookie('SESSION_ID', token).status(200).json('User/Password Authenticated');
    }
  }
  else {
    res.status(400).send('no token'); // Placeholder response
  }
});

/** Check token for validity*/
authRoutes.route('/check_token').post( (req, res) => {
  if (req.auth === process.env['USERNAME']) {
    res.status(200).json('Authenticated Token');
  }
  else {
    res.status(400).json('Invalid token'); // Placeholder response
  }
});

/**
 * Generates JWT token
 */
function generate_jwt() {

  let payload = {
    user: process.env['USERNAME']
  }
  let token = jwt.sign(payload, secret_key, {
    algorithm: 'RS256',
    expiresIn: 7200
  });

  return token;
}
module.exports = authRoutes;
