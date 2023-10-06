import mongoose from 'mongoose';

const createJobSchema = mongoose.Schema({
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'companies',
        required : true
    },

    position : {
        type : String,
        required : true
    },

    location : {
        type : String,
        required : true
    },

    salaryPackage : {
        type : String,
        required : true,
    },

    requirements : {
        type : String,
        required : true
    },

    industry : {
        type : mongoose.Schema.Types.ObjectId,
        ref  :  'job industry'
    },

    createdAt : {
        type : Date,
        default : Date.now()
    },

    applicants : [
        {
            userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'users',
            },
    
            appliedAt : {
                type : Date,
                default : Date.now()
            },

            status : {
                type : String,
                enum : ['Pending' , 'Accepted' , 'Rejected'],
                default : 'Pending'
            },
        }
    ]
});


const jobModel = mongoose.model('job openings' , createJobSchema);


export default jobModel;