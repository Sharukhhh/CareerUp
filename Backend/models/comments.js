import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },

    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'posts',
        required : true
    },

    text : {
        type : String,
        required : true
    },

    createdAt : {
        type : Date,
        default : Date.now
    },

} , {timestamps : true});

export const commentModel = mongoose.model('comments' , commentSchema);