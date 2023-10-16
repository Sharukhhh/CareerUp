import mongoose from 'mongoose';


const chatSchema = mongoose.Schema({
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users'
        }
    ],

    messages : [
        {
            sender : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'users',
            },

            message : {
                type : String
            },

            created : {
                type : Date,
                default : Date.now
            },
        },
    ]
    
} , {timestamps : true});


const chatModel = mongoose.model('chats' , chatSchema);

export default chatModel;