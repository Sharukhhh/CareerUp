import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    name : {
        type: String,
        required : true,
        validate : {
            validator : (value) => {
                return /[a-zA-Z]/.test(value)
            },
            message : 'Invalid Name entry'
        }
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
    },

    location : String,

    headline : String,

    skills : String,

    profileImage : String,

    education : [
        {
            institute : String ,
            fieldOfStudy : String,
            location : String,
            from : Date,
            to : Date
        }
    ],

    profession : [
        {
            companyName : String,
            location : String,
            position : String,
        }
    ],

    resume : {
        data : Buffer,
        contentType : String
    }

    
})

const userModel = mongoose.model('users' , userSchema);

export default userModel;