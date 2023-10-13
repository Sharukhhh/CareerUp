import mongoose from 'mongoose';

const notifySchema = mongoose.Schema({
    message : {
        type : String,
    }, 

    createdAt : {
        type : Date,
        default : Date.now
    },

    type : {
        type : String,
        enum : ['connection' , 'notify' , 'job']
    },

    senderUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' // Reference to the user who sent the request
    },

    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
});

const notifyModel = mongoose.model('notifications' , notifySchema);

export default notifyModel;