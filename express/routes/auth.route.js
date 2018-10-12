const express = require('express');
const authRoutes = express.Router();
const jwt = require('express-jwt');
// const jwt = require('jsonwebtoken');
express();

const secret_key = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDhJhGeFs8YqjW2tKcu+oBiG2pnKlhqgdXieUxAUTRQUyiq7QD+
z+QiD8RES4+b7GHgw5UR3KK2JZtC9ynyMCQEdzauRJqVWDSH0JFv37KQeVnPuTl5
kpgk0KKJ/ktp8UvLJtj81jy3hid6lyR71CkbVR3hDteLYbjeLol/dspW0QIDAQAB
AoGAHWvQGYx5e4uigUGSJz1s0WUrvld2PlTBElsvb6gs4eI8Cjn2S1X3RcwxpYsK
NSHqmGh2bmMakBrR8ypBPPi1e/EZFB8xuX76ghGjCesiR1Ktd3CUWXITpx/SVvaY
dSP9pGRXQmAYGMD+WoBJe0EFUHB0QjFr++CHIiuK0JdiIlECQQD7HvofRRqaF27d
gjtpQtALlKL0nuMGgiSBDdYoaFh1wSiicgkFTxR8JR/Cg9VnE+to22LFzKl+kTHk
K+e3XzY/AkEA5YXpOhV9HO7K3Z+KIS1RFIwTmNjxd7nlbFqCEPjWhWH4MJgDvQF1
zxZ1LTrKOO7hjS408EGbU1drpH3+CMDO7wJAL0DI+BFczBoUtoHHBCuaUlOJxlYP
ii37CH2+CqR34NCUAN1MbT9QL3wc2dFM2rSY24ZMs8OrMTHJHZJVa9/yqQJARwVb
uKxjjWtafJ9cR43VM+1wNvCSL0Dne9K5wnStNJKvEKJJLdfg01aYpYk2f81zH5N3
sAws+unnFfwieiTnIwJBAOvjqDPoQlbN1NU6fFOND/wJXU4FwEH3qKXmEozcaZku
BfDSkhlsFYbIY8YvF3ZAcyn/Cvc5cP3vcHY5n0p/zVk=
-----END RSA PRIVATE KEY-----`    // placeholder key
// let Admin = require('../models/Admin')

const TEMP_username_match = 'admin';
const TEMP_password_match = 'password';  // placeholder admin/password

// Preset username and password
// Admin.username = 'admin';
// Admin.password = 'password';


const checkIfAuthenticated = jwt({
  secret: secret_key
});


authRoutes.route('/').post( (req, res) => {
  // if sent admin = 'admin' and sent password = 'password'
  // generate JWT key (encrypt with secret keys)
  if (req.body.user == TEMP_username_match && req.body.password === TEMP_password_match) {
      let token = generate_jwt();
      // let token = 'generated-token'
      // Respond with secure cookie
      // https://www.youtube.com/watch?v=o2RBvg7Bb9A
      // https://angular-university.io/lesson/server-side-user-identification
      // https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
      // http://jasonwatmore.com/post/2018/05/23/angular-6-jwt-authentication-example-tutorial

      console.log(token);
      res.cookie('SESSION_ID', token, {httpOnly: true, secure: true, sameSite: true});
      res.status(200).send('Successful Auth');
  }
  // else if req.cookies(), check token and decrypt (with secret keys), check time validity, etc.
  // else return 400
  else {
    res.status(400).send('no token'); // Placeholder response
  }
});

authRoutes.route('/').get(checkIfAuthenticated, (req,res) => {
  // WIP
})

function generate_jwt() {

  let payload = {
    user: TEMP_username_match
  }
  let token = jwt.sign(payload, secret_key, {
    algorithm: 'RS256',
    expiresIn: '4h'
  });

  return token;
}

module.exports = authRoutes;
