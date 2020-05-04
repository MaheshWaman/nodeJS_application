var express = require('express');
var router = express.Router();
const technology = require('../model/technologyList')
const documentupload = require('../model/fileUploadDetail')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkauth = require('../middleware/checkAuth')
const multer = require('multer')
const path = require('path');
// const upload = multer({
//     dest :'files'
// })

const storage =multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'files')
    },
    filename:(req,file,callBack)=>{
        callBack(null,Date.now()+'-'+file.originalname)
    }
})

const upload = multer({
        storage:storage
    })

router.post('/uploadFiles',upload.single('file'),(req,res,next)=>{
    let file = req.file;
    let body = req.body;   
    console.log(file);
    console.log("body",body.type);
    if(!file){
        const error= new Error('Please upload file');
        error.status = 400;
        return next(error)
    }
    else{
        
        const data = new documentupload({
            _id : new mongoose.Types.ObjectId(),
            moduleName:req.body.type,
            subModuleName:req.body.subtype,
            fileName:req.file.filename
       
        });
        data.save().then(result =>{
            console.log("this is result : ",result);
            res.status(200);
            // res.send(result);
            res.send({uploadfile:req.file.filename,message:'Successfully uploaded !!'})

        })
        .catch(err =>{
            console.log("This is error",err);
            res.status(500).json({error : err});
        });
    }
})

router.post('/download',function(req,res,next){
    var filepath = '../../files'
    var filename =req.body.name;
    console.log(req.body.name);
    console.log(path.join(__dirname,filepath)+'/'+filename);
    res.download(path.join(__dirname,filepath)+'/'+filename);
    // res.sendFile(path.join(__dirname,filepath)+'/'+filename);
})
/* GET users listing. */
router.get('/technologylist/:id',checkauth, function(req, res,next) {
    console.log("Api call");
    // let id = req.params.id;
    technology.findOne({_id:req.params.id}).exec().then(result =>{
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




router.post('/technologylist',checkauth,(req,res,next)=>{
  console.log("Request :",req.body);
 const data = new technology({
     _id : new mongoose.Types.ObjectId(),
     technicalfieldList:req.body.technicalfieldList

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

router.delete('/registerUser/:id',checkauth,(req,res,next)=>{
  let id = req.params.id;
  technology.remove({_id:id}).then(result =>{
      res.status(200);
      res.send(result);
  })
  .catch(err=>{
      res.status(500).json({Error : err})
  })
})

module.exports = router;
