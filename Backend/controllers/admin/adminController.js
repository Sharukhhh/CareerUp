import adminModel from "../../models/admin.js";
import jwt from "jsonwebtoken";
import userModel from "../../models/userModel.js";
import companyModel from "../../models/companyModel.js";

// ADMIN - auth
export const adminLogin = async (req, res) => {
    try {
        const {email ,password} = req.body;

        const admin = await adminModel.findOne({email});

        if(!admin){ 
            return res.status(400).json({error : 'Admin not found'});
        } else {

            if(password === admin.password){
                const token =jwt.sign({adminId : admin.id , adminmail : admin.email} , process.env.JWT_SECRET ,{expiresIn : '1hr'});
                return res.status(200).json({message : 'Login Successfull' , token});
            } else {
                return res.status(400).json({error : 'Admin not found'});
            }
        }
    } catch (error) {
        console.log(error);
    }
}
// *********************************************************************************
// *********************************************************************************

// ADMIN - User Managment
export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        if(users){
            res.status(200).json({users});
        } else {
            res.status(404).json({error : 'No users registered'});
        }

    } catch (error) {
        console.log(error);
    }
}

export const blockUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const updateUser = await userModel.findByIdAndUpdate(userId, 
                {isBlocked : true} , {new : true}
            );

        if(!updateUser){
            return res.status(404).json({error : 'User not found'});
        }

        res.status(200).json({message : `Blocked ${updateUser.name}`});

    } catch (error) {
        console.log(error);
    }
}

export const unBlockUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const updateUser = await userModel.findByIdAndUpdate(userId, 
                {isBlocked : false} , {new : true}
            );

        if(!updateUser){
            return res.status(404).json({error : 'User not found'});
        }

        res.status(200).json({message : `Unblocked ${updateUser.name}`});
    } catch (error) {
        console.log(error);
    }
}
// **********************************************************************************
// *********************************************************************************

// ADMIN - Company Management
export const getCompanies = async(req, res) => {
    try {  
        const companies = await companyModel.find();
        
        if(companies){
            res.status(200).json({companies});
        } else {
            res.status(404).json({error: 'no companies registered'});
        }
        
    } catch (error) {
        console.log(error);
    }
} 

export const verifyCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        if(!companyId){
            return res.status(404).json({error : 'Company not found'});
        }

        const updateCompany = await companyModel.findByIdAndUpdate(companyId,
                {verify : true} , {new : true}
        );

        if(!updateCompany){
            return res.json({error : 'Not Properly Updated'});
        }
        
        res.status(200).json({message : 'Verified Successfully'});

    } catch (error) {
        console.log(error);
    }
}


export const blockCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        if(!companyId){
            return res.status(404).json({error : 'Company not found'});
        }

        const updateCompany = await companyModel.findByIdAndUpdate(companyId,
            {isBlocked : true} , {new : true}
        );

        res.json({message : `Blocked ${updateCompany.name}!!`});

    } catch (error) {
        console.log(error);
    }
}

export const unBlockCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        if(!companyId){
            return res.status(404).json({error : 'Company not found'});
        }

        const updateCompany = await companyModel.findByIdAndUpdate(companyId,
            {isBlocked : false} , {new : true}
        );

        res.json({message : `UnBlocked ${updateCompany.name}!!`});
        
    } catch (error) {
        console.log(error);
    }
}