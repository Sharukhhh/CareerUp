import mongoose from 'mongoose';

const notifySchema = mongoose.Schema({

    senderUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' // Reference to the user who did action which created a notification
    },

    receiverUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'  //Reference to the user who recieve the notification
    },

    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'posts'
    },
    
    message : {
        type : String,
    }, 

    createdAt : {
        type : Date,
        default : Date.now
    },

    type : {
        type : String,
    },

    read : {
        type : Boolean,
        default : false
    }

} , {timestamps : true});

const notifyModel = mongoose.model('notifications' , notifySchema);

export default notifyModel;