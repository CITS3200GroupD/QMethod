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
 * See https://qmethod.gitbook.io/project/documentation/survey-api
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
      res.status(200).json('Successfully Updated');
    })
    .catch((err) => {
      res.status(400).send(`Unable to update - ${err.message}`);
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
      res.status(200).json(surveys);
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
      res.status(200).json(survey);
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
        res.status(200).json('Successfully Updated');
      })
      .catch((err) => {
        res.status(400).send(`Unable to update - ${err.message}`);
      });
    }
  });
});

// Delete survey item from database
surveyRoutes.route('/:id').delete( (req, res) => {
  Survey.findByIdAndRemove({_id: req.params.id}, (err) => {
    if (err) {
      res.status(400).json(err);
    }
    else {
      res.status(200).json('Successfully removed');
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
          res.status(200).json('Successfully added new statement');
          console.log('Added Statement');
        })
        .catch((err) => {
          res.status(400).send(`Unable to update - ${err.message}`);
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
          res.status(200).json('Successfully removed');
          console.log('Removed Statement');
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
});


/***
 * Users RESTful API
 * ============================================================================
 * See https://qmethod.gitbook.io/project/documentation/user-api
 * ============================================================================
 */

module.exports = surveyRoutes;