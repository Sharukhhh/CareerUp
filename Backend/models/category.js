import mongoose from "mongoose";

const industryCategorySchema = mongoose.Schema({
    industry : {
        type : String,
        required : true
    },

    addedAt : {
        type : Date,
        default : Date.now
    }
});


const categoryModel = mongoose.model('job industry' , industryCategorySchema);

export default categoryModel;