const express= require('express');

express();

const userRoutes = express.Router();

let Survey = require('../models/Survey');
let User = require('../models/User');


/***
 * Users RESTful API
 * ============================================================================
 * See https://qmethod.gitbook.io/project/documentation/user-api
 * ============================================================================
 */

// TODO: In general this code needs to be a lot more robust
// and need to add security and authentication.

// Returns User data
userRoutes.route('/:id/users').get((req,res)=> {
  const id = req.params.id;
  Survey.findById(id, (err, survey)=> {
    if (err || !survey) {
      res.status(400).json(err);
      console.error('No Survey Found');
    }
    else if(survey){
      res.status(200).json(survey.users);
      console.log(`${survey._id} userdata returned`);
    }
  });
});

// Add Userdata to a Survey determined by id
userRoutes.route('/:id/addUser').post((req, res)=> {
  if (req.body.constructor === Object &&
    Object.keys(req.body).length === 0) {
    res.status(400).json('Bad Request');
    console.error('Bad Request');
  } else {
    const id = req.params.id;
    Survey.findById(id, (err, survey)=>{
      if (err || !survey) {
        res.status(400).json(err);
        console.error('No Survey Found');
      }
      else {
        let user = new User(req.body);
        user.progress = 0;      // Force user progress to be 0.
        survey.users.push(user);
        console.log(user);
        user.save()
        .then(() => {
          survey.save()
          .then(() => {
            res.status(200).json('Successfully Updated');
            console.log(`Added User with id: ${user._id}`)
          })
          .catch((err) =>{
            res.status(400).json(`Unable to update - ${err.message} `);
            console.error('Unable to update');
          });
        })
        .catch((err) => {
          res.status(400).send(`Unable to update - ${err.message}`);
          console.error('Does not match userSchema');
        });
      }
    });
  }
});

// TODO: Documentation
userRoutes.route('/:id/user/:user_id').get((req,res)=> {
  const id = req.params.id;
  Survey.findById(id,(err,survey)=>{
    if( err || !survey ) {
      res.status(400).json(err);
      console.error('No Survey Found')
    }
    else {
      const user_id = req.params.user_id;
      const curr_user = survey.users.id(user_id);
      if (!curr_user) {
        console.error('Error - User not found');
        res.status(400).json('Error - User not found');
      }
      else {
        console.log('Found User');
        res.status(200).json(curr_user);
      }
    }
  });
});

// TODO: Documentation - Need to test
userRoutes.route('/:id/user/:user_id').post((req,res)=> {

  if (req.body.constructor === Object &&
    Object.keys(req.body).length === 0 || Object.keys(req.body).length > 2) {
    res.status(400).json('Bad Request');
    console.error('Bad Request');
  } else {
    const id = req.params.id;
    Survey.findById(id,(err,survey) => {
      if (err || !survey) {
        res.status(400).json(err);
      }
      else {
        const user_id = req.params.user_id;
        let curr_user = survey.users.id(user_id);
        if (!curr_user) {
          console.error('Error - User not found');
          res.status(400).json('Error - User not found');
        }
        else {
          curr_user = new User(req.body);
          user.save()
          .then(() => {
            survey.save()
            .then(() => {
              res.status(200).json('Successfully Updated');
              console.log('Updated User');
            })
            .catch((err) => {
              res.status(400).send(`Unable to update - ${err.message}`);
              console.error('Unable to update');
            });
          })
          .catch((err) => {
            res.status(400).send(`Unable to update - ${err.message}`);
            console.error('Does not match userSchema');
          });

        }
      }
    });
  }
});

// TODO: Documentation - currently not working
userRoutes.route('/:id/user/:user_id').delete((req,res)=>{
  const id = req.params.id;
  Survey.findById(id,(err,survey)=>{
    if (err || !survey) {
      res.status(400).json(err);
    }
    else {
      const user_id = req.params.user_id;
      const curr_user = survey.users.id(user_id);
      if (!curr_user) {
        console.error('Error - User not found');
        res.status(400).json('Error - User not found');
      }
      else {
        curr_user.remove();
        survey.save().then(() => {
          res.status(200).json('Successfully Removed');
          console.log('Removed User');
        })
        .catch((err) => {
          res.status(400).send(`Unable to update - ${err.message}`);
        });
      }
    }
  });
});

module.exports = userRoutes;
