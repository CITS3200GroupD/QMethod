const express= require('express');

express();

const userRoutes = express.Router();

let User = require('../models/User');
let Survey = require('../models/Survey');

// Returns User data

userRoutes.route('/:id/users').get((req,res)=> {
const id = req.param.id;
Survey.findById(id, (err, survey)=> {
   if(err||!survey) {
      res.status(400).json(err);
     }
  else if(survey){
     res.status(200).json(survey.users);
     }

  })
})
// Add Userdata to a Survey determined by id
userRoutes.route('/:id/addUser').post((req, res)=> {

   const id = req.param.id;
   Survey.findById(id,(err,survey)=>{
     if(err||!survey){
       res.status(400).json(err);
     }
     else if(survey) {
      let user = new User(req.body);
      let users = survey.users;
      users.push(user);
      survey.save().then(()=>{
        res.status(200).json('Successfully Added User');
        console.log('Added User')
      }).catch(()=>{
        res.status(400).json(`Unable to update - ${err.message} `);

      })
     }
   })

})

userRoutes.route('/:id/user/:user_id').get((req,res)=> {
  const id = req.param.id;
  Survey.findById(id,(err,survey)=>{
     const user_id = req.param.user_id;
     if(err||!survey){
       res.status(400).json(err);
     }
     else if(survey) {
     User.findById(user_id,(err_user,user)=>{
       if(err_user||!user) {
         res.status(400).json(err_user);
       }
       else if(user) {
           res.status(200).json(user);
        }
       })
     }
  })
})

userRoutes.route('/:id/user/:user_id').post((req,res)=>{
  const id = req.param.id;
  Survey.findById(id,(err,survey) =>{
    if(err||!survey) {
      res.status(400).json(err);
    }
    else if(survey) {
      const user_id = req.param.user_id;
      User.findByIdAndUpdate(user_id,req.param.body,(err_user,user)=>{
        if(err_ued||!user) {
          res.status(400).json(err);
          //Possibly required to deliver more detailed error
        }

          /*
            Not sure if the update of the user info will contain all information
            on User schema, or only just the updated information
            Implemented assuming the later* */


      })
    }
  })
})

userRoutes.route('/:id/user/:user_id').delete((req,res)=>{
  const id = req.param.id;
  Survey.findById(id,(err,survey)=>{
    if(err||!survey) {
      res.status(400).json(err);
    }
    else if (survey){
      const user_id = req.param.user_id;
      User.findByIdAndDelete(user_id,(err_user)=> {
        if(err_user) {
          res.status(400).json(err);
        }
        else {
          res.status(200).json('User removed');
        }
      })
    }
  })
})




