const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB'),
    jwt = require('jsonwebtoken'),
    fs = require('fs')

    const public_key = fs.readFileSync('./config/public.key'); // placeholder key

    // For dev builds, use test database
    if (process.argv[2] != 'deploy') {
      process.env['MONGODB_URI'] = config.TEST_DB;
    }

    // init mongoDB
    mongoose.Promise = global.Promise;
    mongoose.connect(`${process.env['MONGODB_URI']}&ssl=true`, {sslValidate: true, useNewUrlParser: true}).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    // init express
    const app = express();
    const port = process.env['PORT'] || 8080;
    const server = require('http').createServer(app);
    server.listen(port, function(){
     console.log(`Listening on port ${port}`);
     console.log(`Host: ${server.address().address}`);
    });
    const origin = server.address().address;

    // Options for CORS (cross origin resource sharing)
    const cors_options = {
      origin: ['http://localhost:8080', 'N/A', 'localhost', 'http://localhost:4200', origin, '*'],
      credentials: true
    }
    app.use(cors(cors_options)); // init CORS
    app.use(cookieParser());     // init Cookie-Parser
    /* For the deployment build, we also want to use the
     * express server to host our (built and pre-compiled) /dist
     * files. */
    if (process.argv[2] === 'deploy') {
      app.use(express.static(__dirname + '/dist'));
    }
    app.use(bodyParser.json());
    app.use((err, req, res, next) => {
      console.log(req);
      if (err !== null) {
        console.error('Invalid JSON received')
        return res.json('Invalid JSON');
      }
      return next();
    });


    app.use( (res, req, next) => {
      // Check for authentication
      get_req_auth(res, req, next);
    })
    // Auth route (JWT)
    const authRoutes = require('./express/routes/auth.route');
    app.use('/auth', authRoutes);

    // Routes for RESTful API for Survey Data
    const surveyRoutes = require('./express/routes/survey.route');
    app.use('/api', surveyRoutes);

    // Routes for RESTful API for User Data
    const userRoutes = require('./express/routes/user.route');
    app.use('/api2', userRoutes);

    /**
     * For the deployment build
     * For all GET requests, send back index.html
     * so that PathLocationStrategy can be used
     * If an incoming request uses a protocol other than HTTPS,
     * redirect that request to the same url but with HTTPS
     */
    if (process.argv[2] === 'deploy') {
      app.get('/*', function(req, res) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
          return res.redirect(
          ['https://', req.get('Host'), req.url].join('')
          );
        }
        res.sendFile(path.join(__dirname + '/dist/index.html'));
      });
    }

    // For the deployment build
    // For all GET requests, send back index.html
    // so that PathLocationStrategy can be used
    if (process.argv[2] === 'deploy') {
      app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname + '/dist/index.html'));
      });
    }

    // Functions
    /**
     * Function to authenticate session cookie and pass as a request attribute
     * @param {Request} req Request
     * @param {Response} res Response
     * @param {Next} next Next
     */
    function get_req_auth(req, res, next) {
      // Catch the authentication cookie
      if (req.cookies && req.cookies['SESSION_ID']) {
        const auth_cookie = req.cookies['SESSION_ID'];
        try {
          handle_cookie(auth_cookie, req);
        } catch (err) {
          console.error(err);
          next();
        }
      } else {
        next();
      }
    }

    /**
     * Function to convert cookie to request
     * @param {string} token
     * @param {Request} req
     */
    function handle_cookie(token, req) {
      try {
        const payload = decode_jwt(token);
        req['auth'] = payload['user'];
      }
      catch(err) {
        // console.log('Error: Could not extract user', err.message);
      }
    }

    /**
     * Decodes JWT token
     * @param token The string of the encoded token
     */
    function decode_jwt(token) {
      const payload = jwt.verify(token, public_key);
      console.log('JWT payload successfully decoded', payload);
      return payload;
    }

