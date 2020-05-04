const mongoose= require('mongoose');
const menuSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    menu:Array
    
})


module.exports = mongoose.model('menu',menuSchema)