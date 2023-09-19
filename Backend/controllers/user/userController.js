import jwt from 'jsonwebtoken';
import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js'; 
import { postModel } from '../../models/posts.js';
import cloudinary from '../../utils/cloudinary.js';



export const getProfile = async (req, res , next) => {
    try {
        const id = req.params.id;
        
        const findUser = await userModel.findById(id);

        if(!findUser){
            return res.status(400).json({error : 'No user'})
        }

        res.staus(200).send(findUser);
        
    } catch (error) {
        next(error);
    }
}

// *********************************************************************************
// *********************************************************************************
export const createPost = async (req, res , next) => {
    try {
        
        //posts without media
        if(!req.files || req.files.length === 0){
            console.log('description only post');

            const newPost = new postModel({
                description : req.body.description , 

            });

            await newPost.save();

            res.json({message : 'New post Added!' , newPost});

        } else {

            const isImage = /\.(jpg|jpeg|png)$/i.test(req.files[0].originalname);
            const isVideo = /\.(mp4)$/i.test(req.files[0].originalname);

            if(isImage || isVideo){

                const uploadCloudinary = await cloudinary.uploader.upload(req.files[0].path , {
                    resource_type : isImage ? 'image' : 'video'
                });

                const newPost = new postModel({
                    description : req.body.description,
                    media : uploadCloudinary.url,
                    // user : req.body.userId
                });

                await newPost.save();

                res.json({message : 'New post Added!' , newPost});
            }
        }
    } catch (error) {
        next(error);
    }
}

export const deletePost = async (req, res , next) => {
    try {

        const postId = req.params.id;

        if(!postId){
            return res.status(404).json({message : 'Post Not Found'});
        }

        const findPost = await postModel.findByIdAndUpdate(postId ,
            {isDeleted : true} , {new: true}
        );

        console.log(findPost);

        res.json({message : 'Post Deleted Successfully'});

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
