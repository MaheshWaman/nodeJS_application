const mongoose= require('mongoose');
const documentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    moduleName:String,
    subModuleName: String,
    fileName :String
    
})


module.exports = mongoose.model('Doucment',documentSchema)