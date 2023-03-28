const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const TitleSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    status:{
        type:String,                 
        default : "all",  //['completed', 'active', 'all']
    },
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description:{
        type: String,
        require:true,
        trim:true
      },
 
});
module.exports = mongoose.model('title', TitleSchema)