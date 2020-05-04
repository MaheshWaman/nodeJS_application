const mongoose= require('mongoose');
const technologySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    technicalfieldList:Object,
    
})


module.exports = mongoose.model('technology',technologySchema)