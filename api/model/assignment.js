const mongoose= require('mongoose');
const assignmentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    assignments:Object,
    assignmentType: String
    
})


module.exports = mongoose.model('assignment',assignmentSchema)