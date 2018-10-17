const jwt = require('jsonwebtoken'),
  settings = require('../../config/Settings')

const utils = {

  // FUNCTIONS
  /**
   * Function to authenticate session cookie and pass as a request attribute
   * @param {Request} req Request
   * @param {Response} res Response
   */
  get_req_auth: function(req, res, next) {
    // Catch the authentication cookie
    if (req.cookies && req.cookies['SESSION_ID']) {
      const auth_cookie = req.cookies['SESSION_ID'];
      try {
        utils.handle_cookie(auth_cookie, req);
      } catch (err) {
        console.log('error has occured');
        console.error(err);
      }
    }
  },

  /**
   * Function to convert cookie to request
   * @param {string} token
   * @param {Request} req
   */
  handle_cookie: function(token, req) {
    try {
      const payload = utils.decode_jwt(token);
      req['auth'] = payload['user'];
    }
    catch(err) {
      console.log('error has occured');
      console.error(err);
      // console.log('Error: Could not extract user', err.message);
    }
  },

  /**
   * Generates JWT token
   */
  generate_jwt: function() {

    let payload = {
      user: process.env['USERNAME']
    }
    let token = jwt.sign(payload, process.env['PRIVATE_KEY'], {
      algorithm: 'RS256',
      expiresIn: settings.EXPIRE_TIME
    });

    return token;
  },

  /**
   * Decodes JWT token
   * @param token The string of the encoded token
   */
  decode_jwt: function(token) {
    const payload = jwt.verify(token, process.env['PUBLIC_KEY']);
    // console.log('JWT payload successfully decoded', payload);
    return payload;
  }
}

module.exports = utils;
