const jwt = require('jsonwebtoken');
module.exports =(req,res,next) =>{
    console.log("auth js")
    try{
        console.log(req.headers)
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token,'secretKey');
        console.log("decoded result",decoded);
        next();
    }
    catch (error){
        // console.log(error,error.message);
        if(error.name == 'JsonWebTokenError'){
            return res.status(501).json({
                message :'Invalid Data'
            })
        }
        else if(error.name == 'TokenExpiredError'){


            return res.status(401).json({
                message :'Session Expired'
            })
        }
        
    }
    
}