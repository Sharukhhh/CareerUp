import mongoose from "mongoose";

const commentSchema = mongoose.Schema({ 
    
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
    },

    companyId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'companies',
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

const commentModel = mongoose.model('comments' , commentSchema);


export default commentModel;