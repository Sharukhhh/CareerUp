import mongoose from 'mongoose';

const createJobSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users',
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

    package : {
        type : String,
    },

    requirements : {
        type : String,
        required : true
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }
});


const jobModel = mongoose.model('job openings' , createJobSchema);


export default jobModel;