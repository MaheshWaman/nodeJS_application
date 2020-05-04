const mongoose= require('mongoose');
const userRegistrationSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    roleType : String,
    password : String
})


module.exports = mongoose.model('userCredential',userRegistrationSchema)