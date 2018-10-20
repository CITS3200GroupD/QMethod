const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/DB');


  // For dev builds, use test database
  if (process.argv[2] != 'deploy') {
    process.env['MONGODB_URI'] = config.TEST_DB;
    process.env['USERNAME'] = 'admin';
    process.env['PASSWORD'] = 'password';
    process.env['PUBLIC_KEY'] = fs.readFileSync('./config/public.key'); // placeholder key
    process.env['PRIVATE_KEY'] = fs.readFileSync('./config/private.key'); // placeholder key
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
  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  app.use(bodyParser.json());

  // Options for CORS (cross origin resource sharing)
  let hosts = ['*'];
  if (process.argv[2] != 'deploy') {
    hosts = ['http://localhost:8080', 'http://localhost:4200'];
  }
  const cors_options = {
    origin: hosts,
    credentials: true
  }
  app.use(cors(cors_options)); // init CORS

  /*
   * For the deployment build
   * For all GET requests, send back index.html
   * so that PathLocationStrategy can be used
   * If an incoming request uses a protocol other than HTTPS,
   * redirect that request to the same url but with HTTPS
   */
  if (process.argv[2] === 'deploy') {
    app.get('*', function(req, res) {
      if (!req.secure && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
        );
      }
      res.sendFile(path.join(__dirname + '/dist/index.html'));
    });
  }

  /*
   * For the deployment build, we also want to use the
   * express server to host our (built and pre-compiled) /dist
   * files.
   */
  if (process.argv[2] === 'deploy') {
    app.use(express.static(__dirname + '/dist'));
  }
  app.use((err, req, res, next) => {

    console.log(err);
    // console.log(req);
    if (err !== null) {
      console.error('Invalid JSON received')
      return res.json('Invalid JSON');
    }
    return next();
  });

  // Auth route (JWT)
  const authRoutes = require('./express/routes/auth.route');
  app.use('/auth', authRoutes);

  // Routes for RESTful API for Survey Data
  const surveyRoutes = require('./express/routes/survey.route');
  app.use('/api', surveyRoutes);

  // Routes for RESTful API for User Data
  const userRoutes = require('./express/routes/user.route');
  app.use('/api2', userRoutes);
