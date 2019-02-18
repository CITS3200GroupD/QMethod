const express = require('express'),
  surveyRoutes = express.Router(),
  cookieParser = require('cookie-parser'),
  utils = require('../utils/secure.utils');
express();

/***
 * Survey RESTful API
 * ============================================================================
 * See https://qmethod.gitbook.io/project/documentation/survey-api
 * ============================================================================
 */

// TODO: In general this code could be a bit more robust

// Require Survey model in our routes module
let Survey = require('../models/Survey');

surveyRoutes.use(cookieParser());     // init Cookie-Parser

const username = process.env['ADMIN_LOGIN_NAME'];

/**
 * Add new survey item to database
 * Private (Admin) Access
 * Respond with success/failure
 */
surveyRoutes.route('/add').post( (req, res, next) => {
  utils.get_req_auth(req, res, next);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send('Bad Request');
  } else if (!req.headers.qmd || req.auth !== username) {
    res.status(400).send('Bad Auth');
  } else {
    let survey = new Survey(req.body);
    survey.save()
      .then(() => {
        res.status(200).json('Successfully Updated');
      })
      .catch((err) => {
        res.status(400).send(`Unable to update - ${err.message}`);
      });
  }
});

/**
 * Get All Survey Data
 * Private (Admin) Access
 * Respond with JSON of Survey[] Array
 */
surveyRoutes.route('/').get( (req, res, next) => {
  utils.get_req_auth(req, res, next);
  if (!req.headers.qmd || req.auth !== username) {
    res.status(400).send('Bad Auth');
  } else {
    Survey.find( (err, surveys) => {
      if (err) {
        res.status(400).json(err);
      }
      else {
        res.status(200).json(surveys);
      }
    });
  }
});

/**
 * Get existing Survey by id
 * Private (Admin) Access & Public Access
 * Respond with JSON of Survey desired (Sanitised for Public)
 */
surveyRoutes.route('/:id').get( (req, res, next) => {
  utils.get_req_auth(req, res, next);
  if (!req.headers.qmd) {
    res.status(400).send('Bad Auth');
  } else {
    const id = req.params.id;
    Survey.findById(id, (err, survey) => {
      if (err || !survey) {
        res.status(400).json(err);
      } else if (survey) {
        // Check Auth, if not auth...
        if (req.auth !== username) {
          // Do not show unpublished surveys
          if (!survey.publish) {
            res.status(400).send('Bad Request')
          } else {
            // Sanitise Users
            survey.users = [];
            res.status(200).json(survey);
          }
        } else {
          res.status(200).json(survey);
        }
      }
    });
  }
});

/**
 * Update existing Survey by id
 * Private (Admin) Access
 * Respond with success/failure
 */
surveyRoutes.route('/:id').post( (req, res, next) => {
  utils.get_req_auth(req, res, next);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send('Bad Request');
  } else if (!req.headers.qmd || req.auth !== username) {
    res.status(400).send('Bad Auth');
  } else {
    Survey.findById(req.params.id, (err, survey) => {
      if (err || !survey) {
        res.status(400).json(err);
      } else  {
        // Fields
        // TODO*: Redo this to be more robust
        survey.name = req.body.name;
        survey.publish = req.body.publish;

        if (survey.users.length == 0 ) {
          survey.cols = req.body.cols;
          survey.range = req.body.range;
          survey.questionnaire = req.body.questionnaire;
          survey.register = req.body.register;
          survey.statements = req.body.statements;
          survey.instructions = req.body.instructions;
        }

        survey.save().then(() => {
          res.status(200).json('Successfully Updated');
        })
        .catch((err) => {
          res.status(400).send(`Unable to update - ${err.message}`);
        });
      }
    });
  }
});

/**
 * Delete existing Survey by id
 * Private (Admin) Access
 * Respond with success/failure
 */
surveyRoutes.route('/:id').delete( (req, res, next) => {
  utils.get_req_auth(req, res, next);
  if (!req.headers.qmd || req.auth !== username) {
    res.status(400).send('Bad Auth');
  } else {
    Survey.findByIdAndRemove({_id: req.params.id}, (err) => {
      if (err) {
        res.status(400).json(err);
      }
      else {
        res.status(200).json('Successfully Removed');
      }
    });
  }
});

module.exports = surveyRoutes;
