import mongoose from 'mongoose';

const chatMessageSchema = mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },

    chat: { // to the refrence of the chat which the message belongs too
        type : mongoose.Schema.Types.ObjectId,
        ref : 'chats'
    },

    content : {
        type: String,
    }
} , {timestamps : true});


const messsageModel = mongoose.model('messages' , chatMessageSchema);

export default messsageModel;