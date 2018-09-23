const express= require('express');

express();

const userRoutes = express.Router();

let Survey = require('../models/Survey');
let User = require('../models/User');

// Returns User data - Verified as working
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

// Add Userdata to a Survey determined by id - Verified as working
userRoutes.route('/:id/addUser').post((req, res)=> {
  const id = req.params.id;
  Survey.findById(id, (err, survey)=>{
    if (err || !survey) {
      res.status(400).json(err);
      console.error('No Survey Found');
    }
    else if (survey) {
      let user = new User(req.body);
      let users = survey.users;
      users.push(user);
      survey.save().then(()=>{
        res.status(200).json('Successfully Added User');
        console.log('Added User')
      }).catch(()=>{
        res.status(400).json(`Unable to update - ${err.message} `);
        console.error('Unable to update');
      });
    }
  });
});

// TODO: Documentation - currently not working
userRoutes.route('/:id/user/:user_id').get((req,res)=> {
  const id = req.params.id;
  Survey.findById(id,(err,survey)=>{
    const user_id = req.params.user_id;
    if(err||!survey){
      res.status(400).json(err);
    }
    else if(survey) {
    /* TODO: This is incorrect and doesn't work as no collection
     * is defined for User, users are subdocs of Survey
     * https://mongoosejs.com/docs/subdocs.html
     */
    User.findById(user_id,(err_user,user)=>{
      if(err_user||!user) {
        console.error('Error - User not found');
        res.status(400).json(err_user);
      }
      else if(user) {
        console.log('found user');
        res.status(200).json(user);
      }
      });
    }
  });
});

// TODO: Documentation - currently not working
userRoutes.route('/:id/user/:user_id').post((req,res)=>{
  const id = req.params.id;
  Survey.findById(id,(err,survey) =>{
    if(err||!survey) {
      res.status(400).json(err);
    }
    else if (survey) {
      const user_id = req.params.user_id;
      /* TODO: This is incorrect and doesn't work as no collection
       * is defined for User, users are subdocs of Survey
       * https://mongoosejs.com/docs/subdocs.html
       */
      User.findByIdAndUpdate( user_id,req.params.body,(err_user,user)=>{
        if( err_user|| !user) {
          res.status(400).json(err);
          //Possibly required to deliver more detailed error
        }
          /* TODO: User info should contain ALL information on User Schema, it'll become
            clearer how this is done when looking at subdocs (i.e. using existing object,
            updating object's variables and .save())

            Not sure if the update of the user info will contain all information
            on User schema, or only just the updated information
            Implemented assuming the later* */


      });
    }
  });
});

// TODO: Documentation - currently not working
userRoutes.route('/:id/user/:user_id').delete((req,res)=>{
  const id = req.params.id;
  Survey.findById(id,(err,survey)=>{
    if(err||!survey) {
      res.status(400).json(err);
    }
    else if (survey){
      const user_id = req.params.user_id;
      /* TODO: This is incorrect and doesn't work as no collection
       * is defined for User, users are subdocs of Survey
       * https://mongoosejs.com/docs/subdocs.html
       */
      User.findByIdAndDelete(user_id,(err_user)=> {
        if(err_user) {
          res.status(400).json(err);
        }
        else {
          res.status(200).json('User removed');
        }
      });
    }
  });
});

module.exports = userRoutes;
