const express= require('express'),
  userRoutes = express.Router(),
  cookieParser = require('cookie-parser'),
  Survey = require('../models/Survey'),
  User = require('../models/User'),
  utils = require('../utils/secure.utils');
express();


/***
 * Users RESTful API
 * ============================================================================
 * See https://qmethod.gitbook.io/project/documentation/user-api
 * ============================================================================
 */

// TODO: In general this code could be a lot more robust

userRoutes.use(cookieParser());     // init Cookie-Parser

/**
 * Get All User Data for Survey
 * Private (Admin) Access
 * Responds with JSON of Users[] Array
 */
userRoutes.route('/:id/users').get( (req, res, next) => {
  utils.get_req_auth(req, res, next);
  if (!req.headers.qmd || req.auth !== process.env['USERNAME']) {
    res.status(400).send('Bad Auth');
    // console.error('Bad Auth');
  } else {
    const id = req.params.id;
    Survey.findById(id, (err, survey)=> {
      if (err || !survey) {
        res.status(400).json(err);
        // console.error('No Survey Found');
      }
      else if(survey){
        res.status(200).json(survey.users);
        // console.log(`${survey._id} userdata returned`);
      }
    });
  }
});

/**
 * Add Userdata to a Survey determined by id
 * Public Access
 * Responds with user_id of the newly created user.
 */
userRoutes.route('/:id/addUser').post( (req, res) => {
  if (!req.headers.qmd) {
    res.status(400).send('Bad Auth');
    // console.error('Bad Auth');
  } else {
    if (req.body.constructor === Object &&
      Object.keys(req.body).length === 0) {
      res.status(400).send('Bad Request');
      // console.error('Bad Request');
    } else {
      const id = req.params.id;
      Survey.findById(id, (err, survey)=>{
        if (err || !survey) {
          res.status(400).json(err);
          // console.error('No Survey Found');
        }
        else {
          let user = new User(req.body);
          user.progress = 0;      // Force user progress to be 0.
          survey.users.push(user);
          // console.log(user);
          survey.save()
            .then(() => {
              res.status(200).json(`${user._id}`);
              // console.log(`Added User with id: ${user._id}`)
            })
            .catch((err) =>{
              // Failed Survey Validation
              res.status(400).send(`Unable to update - ${err.message} `);
              // console.error('Unable to update');
            });
        }
      });
    }
  }
});

/**
 * Get a User (reference by user_id and survey id)
 * Public Access
 * Responds with JSON of desired User
 */
userRoutes.route('/:id/user/:user_id').get( (req, res) => {
  if (!req.headers.qmd) {
    res.status(400).send('Bad Auth');
    // console.error('Bad Auth');
  } else {
    const id = req.params.id;
    Survey.findById(id,(err,survey)=>{
      if( err || !survey ) {
        res.status(400).json(err);
        // console.error('No Survey Found')
      }
      else {
        const user_id = req.params.user_id;
        const curr_user = survey.users.id(user_id);
        if (!curr_user) {
          // console.error('Error - User not found');
          res.status(400).json('Error - User not found');
        }
        else {
          // console.log('Found User');
          res.status(200).json(curr_user);
        }
      }
    });
  }
});

/**
 * Update a User (reference by user_id and survey id)
 * Public Access
 * Responds with success/failure
 */
userRoutes.route('/:id/user/:user_id').post( (req, res) => {
  if (req.body.constructor === Object &&
    Object.keys(req.body).length === 0 /* || Object.keys(req.body).length > 3 */) {
    res.status(400).json('Bad Request');
    console.error('Bad Request');
  } else if (!req.headers.qmd) {
    res.status(400).send('Bad Auth');
    // console.error('Bad Auth');
  } else {
    const id = req.params.id;
    Survey.findById(id,(err,survey) => {
      if (err || !survey) {
        res.status(400).json(err);
      }
      else {
        const user_id = req.params.user_id;
        let user = survey.users.id(user_id);
        if (!user) {
          // console.error('Error - User not found');
          res.status(400).json('Error - User not found');
        } else if (user.progress >= 3) {
          // Stop updating of already finished user data
          // console.error('User Already Finished');
          res.status(400).json('Unable to update');
        } else {
          // Sanity Check - Force coherant progress update
          switch (user.progress + 1) {
            case 1:
              user.sort_agree = req.body.sort_agree;
              user.sort_disagree = req.body.sort_disagree;
              user.sort_neutral = req.body.sort_neutral;
              break;
            case 2:
              user.matrix = req.body.matrix;
              break;
            case 3:
              user.question_ans = req.body.question_ans;
              break;
          }
          user.progress++;
          survey.save()
            .then(() => {
              res.status(200).json('Successfully Updated');
              // console.log('Updated User');
            })
            .catch((err) => {
              // Failed Survey Validation
              res.status(400).send(`Unable to update - ${err.message}`);
              // console.error('Unable to update');
            });
        }
      }
    });
  }
});

/**
 * Delete a User (reference by user_id and survey id)
 * Private (Admin) Access
 * Responds with success/failure
 */
userRoutes.route('/:id/user/:user_id').delete( (req, res, next) => {
  utils.get_req_auth(req, res, next);
  if (!req.headers.qmd || req.auth !== process.env['USERNAME']) {
    res.status(400).send('Bad Auth');
    // console.error('Bad Auth');
  } else {
    const id = req.params.id;
    Survey.findById(id,(err,survey)=>{
      if (err || !survey) {
        res.status(400).json(err);
      }
      else {
        const user_id = req.params.user_id;
        const curr_user = survey.users.id(user_id);
        if (!curr_user) {
          // console.error('Error - User not found');
          res.status(400).json('Error - User not found');
        }
        else {
          curr_user.remove();
          survey.save().then(() => {
            res.status(200).json('Successfully Removed');
            // console.log('Removed User');
          })
          .catch((err) => {
            res.status(400).send(`Unable to update - ${err.message}`);
          });
        }
      }
    });
  }
});

module.exports = userRoutes;
