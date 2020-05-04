var express = require('express');
var router = express.Router();
const assignment = require('../model/assignment')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkauth = require('../middleware/checkAuth')
/* GET users listing. */
router.get('/getAssignment',checkauth, function(req, res,next) {
    console.log("get api");
    assignment.find().then(result =>{
      console.log(result);
      res.status(200);
      res.send(result)
  })
  .catch(err =>{
      res.status(500).json({Error : err});
  })
  });
router.get('/getAssignmentById/:id',checkauth, function(req, res,next) {
    console.log("Api call");
    // let id = req.params.id;
    assignment.findOne({_id:req.params.id}).exec().then(result =>{
    //   jwt.sign({result : result}, 'secretKey',(err,token)=>{
    //     res.json({
    //       result : result,
    //       token : token
    //     })
    //   })
      
      res.status(200);
      res.send(result)
  })
  .catch(err =>{
      res.status(500).json({Error : err});
  })
  });




router.post('/saveAssignment',checkauth,(req,res,next)=>{
  console.log("Request :",req.body);
 const data = new assignment({
     _id : new mongoose.Types.ObjectId(),
     assignments:req.body.assignments,
     assignmentType:req.body.assignmentType

 });
 data.save().then(result =>{
     console.log("this is result : ",result);
     res.status(200);
     res.send(result);
 })
 .catch(err =>{
     console.log("This is error",err);
     res.status(500).json({error : err});
 });
});

router.delete('/deleteAssignment/:id',checkauth,(req,res,next)=>{
  let id = req.params.id;
  assignment.remove({_id:id}).then(result =>{
      res.status(200);
      res.send(result);
  })
  .catch(err=>{
      res.status(500).json({Error : err})
  })
})

module.exports = router;
