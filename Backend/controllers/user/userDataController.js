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
        
    } catch (error) {
        next(error);
    }
}

export const deleteProfession = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}