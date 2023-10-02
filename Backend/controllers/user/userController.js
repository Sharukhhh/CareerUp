import jwt from 'jsonwebtoken';
import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js'; 
import postModel from '../../models/posts.js';
import cloudinary from '../../utils/cloudinary.js';



export const getProfile = async (req, res , next) => {
    try {
        const id = req.params.id;
        
        const user = await userModel.findById(id).populate({
            path: 'connections.userId',
            select: 'name profileImage',
        }); 
        if(!user){
            const company = await companyModel.findById(id).populate('followers'); 

            if(!company){
                return res.status(400).json({error : 'No user'})
            }
            return res.status(200).json({message: 'success' , user : company});
        }

        res.status(200).json({message : 'success' , user})
        
    } catch (error) {
        next(error);
    }
}

// *********************************************************************************
// *********************************************************************************


export const listAllUsers = async (req, res , next) => {
    try {

        const loggedUser = req.user;

        const users = await userModel.find({_id :{$ne : loggedUser._id}});

        if(!users || users.length === 0){
            return res.status(400).json({error : 'No users found'})
        }

        res.json({message : 'Success' , users});
        
    } catch (error) {
        next(error);
    }
}


// *********************************************************************************
// *********************************************************************************


export const connectAndDisconnectUser = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const user = req.user; 

        if(!user){
            return res.status(404).json({error : 'No user found'});
        }

        let targetUser = await userModel.findById(id);
        if(!targetUser){
            const targetCompany = await companyModel.findById(id);

            if(!targetCompany){
                return res.status(404).json({error : 'Company not found'});
            }

            targetUser = targetCompany;
        }

        if(!targetUser._id || !user._id){
            return res.status(400).json({error : 'Invalid user'});
        }

        if (Array.isArray(user.connections)) {
            const isConnected = user.connections.some((conn) => {
                return conn.userId && conn.userId.equals(targetUser._id);
            });

        if(isConnected){

            user.connections = user.connections.filter((conn) => {
                return conn.userId && !conn.userId.equals(targetUser._id);
            });

            targetUser.connections = targetUser.connections.filter((conn) => {
                return conn.userId && !conn.userId.equals(user._id);
            });

            await user.save();
            await targetUser.save();

            return res.json({message : `Connection Removed with ${targetUser.name}`});

        } else {

            user.connections.push({ userId: targetUser._id });

            targetUser.connections.push({userId : user._id});

            await user.save();
            await targetUser.save();

            return res.json({message : `Connected with ${targetUser.name}`});
        }

    }else{
        return res.status(400).json({ error: 'Invalid connections or targetUser._id' });
    }

    } catch (error) {
        next(error);
    }
}



export const search = async (req, res, next) => {
    try {
        const {query} = req.query;

        const posts = await postModel.find({
            description: { $regex: new RegExp(query, 'i') }, // 'i' makes it case-insensitive
          })
        .populate('user')
        .populate('company')
        .populate('comments');

        if(!posts){
            return res.status(401).json({error : 'Post not found!'});
        }

        return res.json({message : 'Search success' , posts});

    } catch (error) {
        next(error);
    }
}