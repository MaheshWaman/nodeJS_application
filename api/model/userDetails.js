const mongoose= require('mongoose');
const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId:String,
    technology:Array,
    database:Array,
    charts:Array,
    payments:Array,
    experienceYr:String,
    experienceMonths:String,
    assignment:Array
    
})


module.exports = mongoose.model('userDetails',userSchema)