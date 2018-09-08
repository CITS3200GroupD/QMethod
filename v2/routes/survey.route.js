const express = require('express');
// const app = express();
express();
const surveyRoutes = express.Router();

// Require Survey model in our routes module
let Survey = require('../models/Survey');

// Add new survey item to database
surveyRoutes.route('/add').post(function (req, res) {
  let survey = new Survey(req.body);
  survey.save()
    .then(function() {
      res.status(200).send('Survey in added successfully');
      console.log('Added Survey');
    })
    .catch(function() {
      res.status(400).send("Unable to save to database");
    });
});

// Get data (index or listing)
surveyRoutes.route('/').get(function (req, res) {
    Survey.find(function (err, surveys){
    if (err) {
      res.status(400).json(err);
    }
    else {
      res.status(200).json(surveys);
    }
  });
});

// Access existing survey item for editing
surveyRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Survey.findById(id, function (err, survey) {
      if (!survey) {
        res.status(400).json(err);
      }
      res.status(200).json(survey);
  });
});

// Update survey item and push to database
surveyRoutes.route('/update/:id').post(function (req, res) {
  Survey.findById(req.params.id, function(err, survey) {
    if (!survey) {
      res.status(400).json(err);
    }
    else {
      // Fields
      survey.survey_name = req.body.survey_name;
      survey.survey_kurt = req.body.survey_kurt;

      survey.save().then(function() {
        res.status(200).send('Update complete');
        console.log('Updated Survey');
      })
      .catch(function() {
        res.status(400).send("unable to update the database");
      });
    }
  });
});

// Delete survey item from database
surveyRoutes.route('/delete/:id').get(function (req, res) {
  Survey.findByIdAndRemove({_id: req.params.id}, function(err){
    if (err) res.json(err);
    else {
      res.status(200).json('Successfully removed');
      console.log('Survey deleted');
    }
  });
});

// Add new statement
surveyRoutes.route('/add/s/:id').post(function (req, res) {
  let statement = req.body.statement;

  if (typeof statement === 'string' || statement instanceof String) {
    Survey.findById(req.params.id, function(err, survey) {
      if (!survey) {
        res.status(400).json(err);
      }
      else {
        let statements = survey.statements;
        console.log(statement);
        statements.push(statement); // TODO: Reject statements that are too long

        survey.save().then(function() {
          res.status(200).json('Successfully added new statement');
          console.log('Added Statement');
        })
        .catch(function() {
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
surveyRoutes.route('/delete/:id/s/:statement_id').get(function (req, res) {
  Survey.findById(req.params.id, function(err, survey) {
    if (!survey) {
      res.status(400).json(err);
    }
    else {
      let statements = survey.statements;
      let statement_index = req.params.statement_id;
      if (statement_index > -1 && statement_index < survey.statements.length) {

        statements.splice(statement_index, 1);

        survey.save().then(function() {
          res.status(200).json('Successfully removed');
          console.log('Removed Statement');
        })
        .catch(function(){
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