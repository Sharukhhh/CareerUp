import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
    name : {
        type : String,
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
        required : true,
    },

    isBlocked : {
        type : Boolean,
        default : false
    },

    verify : {
        type : Boolean , 
        default : false
    },

    location : String,

    headline : String,

    profileImage : String,
});

const companyModel = mongoose.model('companies' , companySchema);

export default companyModel;