import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js'; 
import postModel from '../../models/posts.js';
import cloudinary from '../../utils/cloudinary.js';


export const createPost = async (req, res , next) => {
    try {
        const images=req.files
        console.log(images,"//////");
        const id = req.params.id;

        let user = await userModel.findById(id);

        if(!user){
            const company = await companyModel.findById(id);

            if(!company){
                return res.status(404).json({error : 'User not found'});
            }
            user = company;
        }

        let cloudimage=[]
        if(images && images.length>0){
            for (const image of images){
              const result=await cloudinary.uploader.upload(image.path)
              cloudimage.push(result.secure_url)
            }
        }
        console.log(cloudimage,"this is my cloud image");
        const newPost = new postModel({
          user: user._id,
          description: req.body.content,
          media: cloudimage
        })
        // if (!req.files || req.files.length === 0) {
        //     console.log('text only post');

        //   } else {
            
        //     const isImage = /\.(jpg|jpeg|png)$/i.test(req.files[0].originalname);
        //     const isVideo = /\.(mp4)$/i.test(req.files[0].originalname);

        //     if (isImage || isVideo) {
        //       console.log('keri ');

        //       const uploadCloudinary = await cloud.uploader.upload(req.files[0].path, {
        //         resource_type: isImage ? 'image' : 'video'
        //       });

        //       console.log('ethi');
      
        //      
      
        //       await newPost.save();
        //       return res.json({ message: 'New post Added!', newPost });
        //     }
        //   }
      
          // const newPost = new postModel({
          //   user: user._id,
          //   description: req.body.content,
          // });
      
          await newPost.save();
          res.json({ message: 'New Post Added'  , newPost});

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

export const getPosts = async (req, res, next) => {
  try {
    const posts = await postModel.find().populate('user').exec();

    if(!posts){
      return res.status(404).json({error : 'No posts found'});
    }

    res.status(200).json({message : 'Posts available' , posts});
  } catch (error) {
    next(error);
  }
}


export const userOnlyPosts = async(req, res, next) => {
  try {
    const id = req.params.id;

    const user = await userModel.findById(id);
    if(!user){
      return res.status(404).json({error : 'user not found'});
    }

    let userPosts;
    if(user.role === 'Candidate'){
      userPosts = await postModel.find({user : id});
    } else if(user.role === 'Company'){
      userPosts = await postModel.find({user : id});
    }

    if(!userPosts){
      return res.status(404).json({message : 'No posts found'});
    }

    return res.status(200).json({message : 'users posts available' , userPosts })

  } catch (error) {
    next(error);
  }
}