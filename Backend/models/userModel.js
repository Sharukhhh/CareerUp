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

    phone : {
        type: Number,
        unique : true
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

    profileImage : {
        type : String,
        default : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'  
    },

    education : [
        {
            institute : String ,
            fieldOfStudy : String,
            instituteLocation : String,
        }  
    ],

    profession : [
        {
            companyName : String,
            jobLocation : String,
            role : String,
        }
    ],

    resume : {
        data : Buffer,
        contentType : String
    }, 

    savedPosts : [{
        postId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'posts',
            required : true
        },

        addedAt : {
            type : Date,
            default : Date.now,
        }
    }],

    pendingRequests : [{
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users'
        }
    }],

    manageRequests : [{
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users'
        } 
    }],

    connections : [{
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users'
        }
    }],

    followingCompanies : [
        {
            company : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'companies'
            }
        }
    ],

    appliedJobs : [
        {
            jobId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'job openings',
            },

            status : {
                type : String,
                enum : ['Pending' , 'Accepted' , 'Rejected'],
                default : 'Pending'
            },

            appliedAt : {
                type : Date,
                default : Date.now
            }
        }
    ],

    chatId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'chats'
    },

    createdOn : {
        type : Date,
        default : Date.now
    }

    
})

const userModel = mongoose.model('users' , userSchema);

export default userModel;