const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

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
    // For the deployment build, we also want to use the
    // express server to host our (built and pre-compiled) /dist
    // files.
    if (process.argv[2] == 'deploy') {
      app.use(express.static(__dirname + '/dist'));
    }
    app.use(bodyParser.json());
    app.use((error, request, response, next) => {
      if (error !== null) {
        console.error('Invalid JSON received')
        return response.json('Invalid JSON');
      }
      return next();
    });

    app.use(cors());
    const port = process.env.PORT || 8080;

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
    if (process.argv[2] == 'deploy') {
      app.get('/*', function(req, res) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
          return res.redirect(
          ['https://', req.get('Host'), req.url].join('')
          );
        }
        res.sendFile(path.join(__dirname + '/dist/index.html'));
      });
    }
    /* (?) repeat code
    // Routes for RESTful API for Survey Data
    const surveyRoutes = require('./express/routes/survey.route');
    app.use('/api', surveyRoutes);

    // Routes for RESTful API for User Data
    const userRoutes = require('./express/routes/user.route');
    app.use('/api2', userRoutes);

    // For the deployment build
    // For all GET requests, send back index.html
    // so that PathLocationStrategy can be used
    if (process.argv[2] == 'deploy') {
      app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname + '/dist/index.html'));
      });
    }
    */
    // const server =
    app.listen(port, function(){
     console.log('Listening on port ' + port);
    });
