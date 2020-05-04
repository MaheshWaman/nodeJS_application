const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require("./api/routes/users");
const technology = require("./api/routes/technology");
const userDetails = require("./api/routes/userDetails");
const assignment = require("./api/routes/assignment");
const mongoose = require('mongoose');

// TeamJSDb
mongoose.connect('mongodb://localhost:27017/TeamJSDb',{useNewUrlParser: true},(error)=>{
    if(!error){
        console.log("Success connected to Db");
    }
    else{
        console.log("Erro in connection :: ",error)
    }
})
,mongoose.set('useFindAndModify', false)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With,Content-Type,Accept,Authorization"
//     );
//     if(req.method === "OPTIONS"){
//         res.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE','GET');
//         return res.status(200).json({});
//     }
// });
app.use('/',userRoutes);
app.use('/technology',technology);
app.use('/userDetails',userDetails);
app.use('/assignment',assignment);

app.use((req,res,next)=>{
    console.log("app use error");
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
// app.use((error,req,res,next)=>{
//     console.log("app use error2");
//     res.status(error );
//     res.json({
//         error :{
//             message : error.message
//         }
//     });
// });
module.exports = app;