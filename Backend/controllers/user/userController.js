import jwt from 'jsonwebtoken';
import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js'; 


export const userProfile = async (req, res) => {
    try {
        const id = req.params.id;
        
        const user = await userModel.findById(id);

        if(!user){
            const company = await companyModel.findById(id);

            if(!company){
                return res.json({error : 'User not found'});
            } else {
                return res.status(200).json({company});
            }
        } else {
            return res.status(200).json({user});
        }
    } catch (error) {
        console.log(error);
    }
}