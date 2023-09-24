import userModel from "../../models/userModel.js";

export const addEducation = async (req, res , next) => {
    try {

        const id = req.params.id;
        const {institute , location , fieldOfStudy , from , to} = req.body;

        if (!institute || !fieldOfStudy || !from || !to) {
            return res.status(400).json({ error: 'Fill All The Fields!' });
          }

        const user = await userModel.findById(id);

        if(!user){
            return res.status(404).json({error : 'User not found'});
        }

        const newEducation = {
            institute,
            location,
            fieldOfStudy,
            from,
            to
        };
        await user.education.push(newEducation);

        await user.save();
        return res.json({message : 'Education Updated'});

    } catch (error) {
        next(error);
    }
}

export const editEducation  = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}

export const deleteEducation = async (req, res, next) => {
    try {
        const educationId = req.params.educationId;

        if(!educationId){
            return res.status(404).json({error : 'Details not found'});
        }

        const result = await userModel.updateOne(
            {'education._id' : educationId},
            {$pull : {education : {_id : educationId}}}
        );

        if(result.nModified === 0){
            return res.status(404).json({error : 'Document not found'});
        }

        const updatedUser = await userModel.findOne({'education._id' : educationId});
        // if(!updatedUser){
        //     return res.status(404).json({error : 'User not found'});
        // }

        res.json({message : 'Deleted Succesfully' , user: updatedUser});
        
    } catch (error) {
        next(error); 
    }
}

// *********************************************************************************
// *********************************************************************************

export const addProfession = async (req, res, next) => {
    try {

        const id = req.params.id;
        const {companyName , location , role } = req.body;

        if(!companyName || !location || !role){
            return res.status(400).json({error : 'Please provide all required fields for Profession'})
        }

        const user = await userModel.findById(id);
        if(!user){
            return res.status(404).json({error : 'User not found'});
        }

        const newProfession = {
            companyName, location, role
        };
        await user.profession.push(newProfession);

        await user.save();
        return res.json({message : 'Profession Updated'})

    } catch (error) {
        next(error);
    }
}

export const editProfession = async (req, res, next) => {
    try {
        const id = req.params.id;

    } catch (error) {
        next(error);
    }
}

export const deleteProfession = async (req, res, next) => {
    try {
        const professionId = req.params.professionId;

        if(!professionId){
            return res.status(404).json({error : 'Details not found'});
        }

        const result = await userModel.updateOne(
            {'profession._id' : professionId},
            {$pull : {profession : {_id : professionId}}}
        );

        if(result.nModified === 0){
            return res.status(404).json({error : 'Document not found'});
        }

        const updatedUser = await userModel.findOne({'profession._id' : professionId});
        // if(!updatedUser){
        //     return res.status(404).json({error : 'User not found'});
        // }

        res.json({message : 'Deleted Succesfully', user : updatedUser});
    } catch (error) {
        next(error);
    }
}