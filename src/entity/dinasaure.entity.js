const mongoose = require('mongoose');
const dinasaureSchema =  mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username : {
        type: mongoose.Schema.Types.String, 
        required: true 
    },
    password : {
        type: mongoose.Schema.Types.String, 
        required: true 
    },
    race : {
        type: mongoose.Schema.Types.String, 
        required: true 
    },
    famille : {
        type: mongoose.Schema.Types.String, 
        required: true 
    },
    norriture : {
        type: mongoose.Schema.Types.String, 
        required: true 
    },
    amis : {
        type:  [mongoose.Schema.Types.ObjectId] ,
        required: true ,
        ref : 'dinasaure'
    }
},{
    timestamps: true
  });
module.exports = mongoose.model('dinasaure', dinasaureSchema);