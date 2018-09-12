const express = require('express');
// const app = express();
express();
const surveyRoutes = express.Router();

// const STATE_LIMIT = 80;
// const NAME_LIMIT = 100;
// const CHAR_LIMIT = 350;

/***
 * Survey RESTful API
 * ============================================================================
 * <url>/api/
 * GET   | respond with json of all surveys                           <PRIVATE>
 * ============================================================================
 * <url>/api/ add
 * POST  | create a new survey item in database                       <PRIVATE>
 * ============================================================================
 * <url>/api/ :id
 * GET   | respond with survey data (scrubbed) corresponding to id     [PUBLIC]
 * GET   | respond with survey item corresponding to id               <PRIVATE>
 * POST  | update survey item corresponding to id                     <PRIVATE>
 * DEL   | remove survey item corresponding to id                     <PRIVATE>
 * ============================================================================
 * <url>/api/ :id/addState
 * POST  | append new statement to survey item s array                <PRIVATE>
 * ============================================================================
 * <url>/api/ :id/delState/ :s_id
 * DEL   | delete statement corresponding to s_id in survey id        <PRIVATE>
 * ============================================================================
 */

// Require Survey model in our routes module
let Survey = require('../models/Survey');

// Add new survey item to database
surveyRoutes.route('/add').post( (req, res) => {
  let survey = new Survey(req.body);
  survey.save()
    .then(() => {
      console.log('Added Survey');
    })
    .catch(() => {
      res.status(400).send("Unable to save to database");
    });
  
});

// Get data (index or listing)

// TODO: Check that response data is valid before returning to client
surveyRoutes.route('/').get( (req, res) => {
    Survey.find( (err, surveys) => {
    if (err) {
      res.status(400).json(err);
    }
    else {
      res.json(surveys);
    }
  });
});

// Access existing survey item for editing

// TODO: Check that response data is valid before returning to client
surveyRoutes.route('/:id').get( (req, res) => {
  // console.log(req.headers);
  const id = req.params.id;
  Survey.findById(id, (err, survey) => {
      if (!survey) {
        res.status(400).json(err);
      }
      res.json(survey);
  });
});

// Update survey item and push to database
surveyRoutes.route('/:id').post( (req, res) => {
  Survey.findById(req.params.id, (err, survey) => {
    if (!survey) {
      res.status(400).json(err);
    }
    else {
      // Fields
      survey.name = req.body.name;
      survey.range = req.body.range;
      survey.publish = req.body.publish;
      survey.cols = req.body.cols;

      survey.save().then(() => {
        console.log('Updated Survey');
      })
      .catch(() => {
        res.status(400).send("Unable to update the database");
      });
    }
  });
});

// Delete survey item from database
surveyRoutes.route('/:id').delete( (req, res) => {
  Survey.findByIdAndRemove({_id: req.params.id}, (err) => {
    if (err) res.json(err);
    else {
      res.json('Successfully removed');
      console.log('Survey deleted');
    }
  });
});

// Add new statement
// Validates that statement is both under CHAR_LIMIT and that
// total statements is under STATE_LIMIT.
surveyRoutes.route('/:id/addState').post( (req, res) => {
  let statement = req.body.statement;

  if (typeof statement === 'string' || statement instanceof String) {
    Survey.findById(req.params.id, (err, survey) => {
      if (!survey) {
        res.status(400).json(err);
      }
      else {
        let statements = survey.statements;
        statements.push(statement);

        survey.save().then(() => {
          res.json('Successfully added new statement');
          console.log('Added Statement');
        })
        .catch(() => {
          res.status(400).send("Unable to update the database");
        });
      }
    });
    } else {
      res.status(400).send("Unable to update the database: Maximum character length exceeded");
    }
});

// Delete statement from database
surveyRoutes.route('/:id/delState/:statement_id').delete( (req, res)=> {
  Survey.findById(req.params.id, (err, survey) => {
    if (!survey) {
      res.status(400).json(err);
    }
    else {
      let statements = survey.statements;
      let statement_index = req.params.statement_id;
      if (statement_index > -1 && statement_index < survey.statements.length) {

        statements.splice(statement_index, 1);

        survey.save().then(() => {
          res.json('Successfully removed');
          console.log('Removed Statement');
        })
        .catch(() => {
          res.status(400).send("Unable to update the database");
        });
      }
      else {
        res.status(400).send("Unable to update the database");
      }
    }
  });
});

/***
 * Users RESTful API
 * ============================================================================
 * <url>/api/ :id/users/
 * GET   | respond with all user_data for this survey {id}                  <PRIVATE>
 * ============================================================================
 * <url>/api/ :id/user/:user_id
 * GET   | respond with user_data corresponding to {user_id} in survey {id} [PUBLIC]
 * POST  | update with user_data corresponding to {user_id} in survey {id}  <PRIVATE>
 * DEL   | delete user_data corresponding to {user_id} in survey {id}       <PRIVATE>
 * ============================================================================
 * <url>/api/ :id/addUser/
 * POST  | append new user to survey {id} users array
 */

module.exports = surveyRoutes;