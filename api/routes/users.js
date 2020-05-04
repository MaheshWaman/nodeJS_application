var express = require('express');
var router = express.Router();
const registerUser = require('../model/registrationUser')
const menu = require('../model/menu')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkauth = require('../middleware/checkAuth')
/* GET users listing. */
router.get('/getusers',checkauth, function(req, res,next) {
  console.log("get api");
  registerUser.find().then(result =>{
    console.log(result);
    res.status(200);
    res.send(result)
})
.catch(err =>{
    res.status(500).json({Error : err});
})
});

router.post('/loginuser', function(req, res,next) {
  console.log("get api");
  console.log(req.body);
  registerUser.findOne({email:req.body.name,password:req.body.password}).select('email , name').then(result =>{
    console.log(result);
    jwt.sign({result : result}, 'secretKey',{expiresIn:'4h'},(err,token)=>{
      console.log(token);
      res.json({
        result : result,
        token : token
      })
    })
    // res.status(200);
    // res.send(result)
})
.catch(err =>{
    res.status(500).json({Error : err});
})
});

router.get('/findbyEmail/:email',checkauth,function(req, res,next) {
  console.log("Email Api call");
  // let id = req.params.id;
  registerUser.findOne({email:req.params.email}).exec().then(result =>{
    // jwt.sign({result : result}, 'secretKey',(err,token)=>{
    //   res.json({
    //     result : result,
    //     token : token
    //   })
    // })
    
    res.status(200);
    res.send(result)
})
.catch(err =>{
    res.status(500).json({Error : err});
})
});


router.post('/registerUser',(req,res,next)=>{
  console.log("Request :",req.body);
 const data = new registerUser({
     _id : new mongoose.Types.ObjectId(),
     name : req.body.name,
     email:req.body.email,
     roleType:req.body.role,
     password : req.body.password

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

router.post('/menuRegister',(req,res,next)=>{
  console.log("Request :",req.body);
 const data = new menu({
     _id : new mongoose.Types.ObjectId(),
     menu:req.body.menuList

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


router.get('/getmenu', function(req, res,next) {
  console.log("get api");
  menu.find().then(result =>{
    console.log(result);
    res.status(200);
    res.send(result)
})
.catch(err =>{
    res.status(500).json({Error : err});
})
});

router.delete('/registerUser/:id',checkauth,(req,res,next)=>{
  let id = req.params.id;
  registerUser.remove({_id:id}).then(result =>{
      res.status(200);
      res.send(result);
  })
  .catch(err=>{
      res.status(500).json({Error : err})
  })
})

module.exports = router;
