import mongoose from 'mongoose';


const adminSchema = mongoose.Schema({
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

    password : {
        type : String,
        required : true,
    },
});


const adminModel = mongoose.model('admin' , adminSchema);

export default adminModel;