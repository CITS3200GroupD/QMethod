const express = require('express');
// const app = express();
express();
const surveyRoutes = express.Router();

/***
 * Survey RESTful API
 * ============================================================================
 * <url>/api/
 * GET  | getSurveys()            | respond with json of all surveys
 * ============================================================================
 * <url>/api/ add/
 * POST = addSurvey(n, k)         | create a new survey item in database
 * ============================================================================
 * <url>/api/ :id
 * GET  = editSurvey(id)          | respond with survey item corresponding to id
 * POST = updateSurvey(n, k, id)  | update survey item corresponding to id
 * DEL  = deleteSurvey(id)        | remove survey item corresponding to id
 * ============================================================================
 * <url>/api/ addState/:id
 * POST = addStatement(id, s)     | append new statement to survey item s array
 * <url>/api/ delState/ :id/:s_id
 * DEL = deleteStatement(id, s_id)| delete statement corresponding to s_id in survey id
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
// surveyRoutes.route('/edit/:id').get( (req, res) => {
surveyRoutes.route('/:id').get( (req, res) => {
  let id = req.params.id;
  Survey.findById(id, (err, survey) => {
      if (!survey) {
        res.status(400).json(err);
      }
      res.json(survey);
  });
});

// Update survey item and push to database
// surveyRoutes.route('/update/:id').post( (req, res) => {
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
        res.status(400).send("unable to update the database");
      });
    }
  });
});

// Delete survey item from database
// surveyRoutes.route('/delete/:id').get( (req, res) => {
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
// surveyRoutes.route('/add/s/:id').post( (req, res) => {
surveyRoutes.route('/addState/:id').post( (req, res) => {
  let statement = req.body.statement;

  if (typeof statement === 'string' || statement instanceof String) {
    Survey.findById(req.params.id, (err, survey) => {
      if (!survey) {
        res.status(400).json(err);
      }
      else {
        let statements = survey.statements;
        console.log(statement);
        statements.push(statement); // TODO: Reject statements that are too long

        survey.save().then(() => {
          res.json('Successfully added new statement');
          console.log('Added Statement');
        })
        .catch(() => {
          res.status(400).send("Unable to update the database");
        });
      }
    });
  }
  else {
    console.log(typeof statement);
    res.status(400).send("Bad param");
  }
});

// Delete statement from database
//surveyRoutes.route('/delete/:id/s/:statement_id').get( (req, res)=> {
surveyRoutes.route('/delState/:id/:statement_id').delete( (req, res)=> {
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

module.exports = surveyRoutes;