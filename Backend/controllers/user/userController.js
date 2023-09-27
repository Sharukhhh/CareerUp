import jwt from 'jsonwebtoken';
import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js'; 
import cloudinary from '../../utils/cloudinary.js';



export const getProfile = async (req, res , next) => {
    try {
        const id = req.params.id;
        
        const user = await userModel.findById(id); 

        if(!user){
            const company = await companyModel.findById(id);

            if(!company){
                return res.status(400).json({error : 'No user'})
            }

            return res.status(200).json({user : company});
        }

        res.status(200).json({user})
        
    } catch (error) {
        next(error);
    }
}

// *********************************************************************************
// *********************************************************************************


export const listAllUsers = async (req, res , next) => {
    try {

        const users = await userModel.find().limit(5);

        if(!users){
            return res.status(400).json({error : 'No users found'})
        }

        res.json({message : 'Success' , users});
        
    } catch (error) {
        next(error);
    }
}
