import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    name : {
        type: String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
        match : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    },

    role : {
        type : String,
        required : true,
        enum : ['Candidate' , 'Company']
    },

    password : {
        type : String,
        required : true
    },

    isBlocked : {
        type : Boolean,
        default : false
    }
})

const userModel = mongoose.model('users' , userSchema);

export default userModel;