import mongoose from "mongoose";


const postSchema = mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },

    description : {
        type : String,
        required : true
    },

    media : [{
        type : String
    }],

    createdAt : {
        type : Date,
        default : Date.now
    },

    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }],

    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'comments'
    }],

    isDeleted : {  //soft-delete
        type : Boolean,
        default : false
    }

} , {timestamps: true});


const postModel = mongoose.model('posts' , postSchema);

export default postModel;