const express = require('express');

express();
const surveyRoutes = express.Router();

/***
 * Survey RESTful API
 * ============================================================================
 * See https://qmethod.gitbook.io/project/documentation/survey-api
 * ============================================================================
 */

// TODO: In general this code needs to be a lot more robust
// and need to add security and authentication.

// Require Survey model in our routes module
let Survey = require('../models/Survey');

/**
 * Add new survey item to database
 * Private (Admin) Access
 * Respond with success/failure
 */
surveyRoutes.route('/add').post( (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send('Bad Request');
  } else if (!req.headers.qmd || !req.headers.authorization) {
    // TODO: Needs Real Auth Checking
    // TODO: Replace with Auth Cookie
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
surveyRoutes.route('/').get( (req, res) => {
  // TODO: Needs Real Auth Checking
  // TODO: Replace with Auth Cookie
  if (!req.headers.qmd || !req.headers.authorization) {
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
surveyRoutes.route('/:id').get( (req, res) => {
  // TODO: Needs Real Auth Checking
  if (!req.headers.qmd) {
    res.status(400).send('Bad Auth');
  } else {
    const id = req.params.id;
    Survey.findById(id, (err, survey) => {
      if (err || !survey) {
        res.status(400).json(err);
      } else if (survey) {
        // TODO: Replace with Auth Cookie
        if (!req.headers.authorization) {
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
surveyRoutes.route('/:id').post( (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send('Bad Request');
  } else if (!req.headers.qmd || !req.headers.authorization) {
    // TODO: Replace with Auth Cookie
    // TODO: Needs Real Auth Checking
    res.status(400).send('Bad Auth');
  } else {
    Survey.findById(req.params.id, (err, survey) => {
      if (err || !survey) {
        res.status(400).json(err);
      } else  {
        // Fields
        // TODO: Redo this to be more robust
        survey.name = req.body.name;
        survey.publish = req.body.publish;

        if (survey.users.length == 0 ) {
          survey.cols = req.body.cols;
          survey.range = req.body.range;
          survey.questionnaire = req.body.questionnaire;
          survey.register = req.body.register;
          survey.statements = req.body.statements;
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
surveyRoutes.route('/:id').delete( (req, res) => {
  if (!req.headers.qmd || !req.headers.authorization) {
    // TODO: Replace with Auth Cookie
    // TODO: Needs Real Auth Checking
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

/**
 * Add new statement to Survey by id
 * Private (Admin) Access
 * Respond with success/failure
 * @deprecated Depreciated as of 0.0.8a
 */
surveyRoutes.route('/:id/addState').post( (req, res) => {
  if (!req.headers.qmd || !req.headers.authorization) {
    // TODO: Replace with Auth Cookie
    // TODO: Needs Real Auth Checking
    res.status(400).send('Bad Auth');
  } else {

    let statement = req.body.statement;

    if (typeof statement === 'string' || statement instanceof String) {
      Survey.findById(req.params.id, (err, survey) => {
        if (err || !survey) {
          res.status(400).json(err);
        }
        else {
          let statements = survey.statements;
          statements.push(statement);

          survey.save().then(() => {
            res.status(200).json('Successfully Added Statement');
          })
          .catch((err) => {
            res.status(400).send(`Unable to update - ${err.message}`);
          });
        }
      });
    } else {
      res.status(400).send("Unable to update the database: Maximum character length exceeded");
    }
  }
});

/**
 * Delete statement from Survey (by index)
 * Private (Admin) Access
 * Respond with success/failure
 * @deprecated Depreciated as of 0.0.8a
 */
surveyRoutes.route('/:id/delState/:statement_id').delete( (req, res)=> {
  if (!req.headers.qmd || !req.headers.authorization) {
    // TODO: Needs Real Auth Checking
    // TODO: Replace with Auth Cookie
    res.status(400).send('Bad Auth');
  } else {
    Survey.findById(req.params.id, (err, survey) => {
      if (err || !survey) {
        res.status(400).json(err);
      }
      else {
        let statements = survey.statements;
        let statement_index = req.params.statement_id;
        if (statement_index > -1 && statement_index < survey.statements.length) {

          statements.splice(statement_index, 1);

          survey.save().then(() => {
            res.status(200).json('Successfully Removed Statement');
          })
          .catch((err) => {
            res.status(400).send(`Unable to update - ${err.message}`);
          });
        }
        else {
          res.status(400).send("Unable to update the database");
        }
      }
    });
  }
});

module.exports = surveyRoutes;
