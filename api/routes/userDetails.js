var express = require('express');
var router = express.Router();
const userDetails = require('../model/userDetails')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkauth = require('../middleware/checkAuth')
router.get('/getUserDetails/:id',checkauth, function(req, res,next) {
    console.log("Api call");
    // let id = req.params.id;
    userDetails.findOne({userId:req.params.id}).exec().then(result =>{
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




router.post('/userDetailsSave',checkauth,(req,res,next)=>{
  console.log("Request :",req.body);
 const data = {
    //  _id : new mongoose.Types.ObjectId(),
     userId:req.body.userId,
    technology:req.body.technology,
    database:req.body.database,
    charts:req.body.charts,
    payments:req.body.payments,
    experienceYr:req.body.experienceYr,
    experienceMonths:req.body.experienceMonths

 }
//  data.save().then(result =>{
//      console.log("this is result : ",result);
//      res.status(200);
//      res.send(result);
//  })
//  .catch(err =>{
//      console.log("This is error",err);
//      res.status(500).json({error : err});
//  });
// let id = req.params.id;
    // console.log(id,req.body.assignmentId);
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    userDetails.findOneAndUpdate({userId : req.body.userId},data,options)
    // userDetails.update({userId : id},{ $push: {"assignment": {
    //     assignmentId:req.body.assignmentId,
    //     completed :''
    // }}},{upsert:True})
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        res.status(500).json({Error : err});
    })
});

router.delete('/registerUser/:id',checkauth,(req,res,next)=>{
  let id = req.params.id;
  userDetails.remove({_id:id}).then(result =>{
      res.status(200);
      res.send(result);
  })
  .catch(err=>{
      res.status(500).json({Error : err})
  })
})

router.put('/assignedtask/:id',checkauth,(req,res,next)=>{
    let id = req.params.id;
    console.log(id,req.body.assignmentId);
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    userDetails.findOneAndUpdate({userId : id},{ $push: {"assignment": {
        assignmentId:req.body.assignmentId,
        completed :''
    }}},options)
    // userDetails.update({userId : id},{ $push: {"assignment": {
    //     assignmentId:req.body.assignmentId,
    //     completed :''
    // }}},{upsert:True})
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        res.status(500).json({Error : err});
    })
})


// if you want update existed data within array of object
// db.collection.update(
//     { _id : ObjectId("57315ba4846dd82425ca2408")},
//     { $pull: {"myarray.userId": ObjectId("570ca5e48dbe673802c2d035")}}
// )
// db.collection.update(
//     { _id : ObjectId("57315ba4846dd82425ca2408")},
//     { $push: {"myarray": {
//         userId:ObjectId("570ca5e48dbe673802c2d035"),
//         point: 10
//     }}



module.exports = router;
