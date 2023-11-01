import mongoose from 'mongoose';


const chatSchema = mongoose.Schema({

    chatName : {
        type: String,
    },

    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users'
        }
    ],

    lastMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'messages'
    }
    
} , {timestamps : true});


const chatModel = mongoose.model('chats' , chatSchema);

export default chatModel;