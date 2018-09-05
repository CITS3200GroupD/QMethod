const express = require('express');
//const app = express();
express();
const surveyRoutes = express.Router();

// Require Survey model in our routes module
let Survey = require('../models/Survey');

// Add new survey item to database
surveyRoutes.route('/add').post(function (req, res) {
  let survey = new Survey(req.body);
  survey.save()
    .then(function(){
    res.status(200).json({'survey': 'Survey in added successfully'});
    })
    .catch(function(){
    res.status(400).send("unable to save to database");
    });
});

// Get data (index or listing)
surveyRoutes.route('/').get(function (req, res) {
    Survey.find(function (err, surveys){
    if(err){
      console.log(err);
    }
    else {
      res.json(surveys);
    }
  });
});

// Access existing survey item for editing
surveyRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Survey.findById(id, function (err, survey){
      res.json(survey);
  });
});

// Update survey item and push to database
surveyRoutes.route('/update/:id').post(function (req, res) {
    Survey.findById(req.params.id, function(err, survey) {
    if (!survey)
      return next(new Error('Could not load Document'));
    else {
        // Fields
        survey.survey_name = req.body.survey_name;
        survey.survey_kurt = req.body.survey_kurt;

        survey.save().then(survey => {
          res.json('Update complete');
      })
      .catch(function(){
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Delete survey item from database
surveyRoutes.route('/delete/:id').get(function (req, res) {
    Survey.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = surveyRoutes;