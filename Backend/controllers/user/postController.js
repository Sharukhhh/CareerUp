import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js'; 
import postModel from '../../models/posts.js';
import cloudinary from '../../utils/cloudinary.js';


export const createPost = async (req, res , next) => {
    try {
        
        const id = req.params.id;

        let user = await userModel.findById(id);

        if(!user){
            const company = await companyModel.findById(id);

            if(!company){
                return res.status(404).json({error : 'User not found'});
            }
            user = company;
        }

        if (!req.files || req.files.length === 0) {
            console.log('text only post');

          } else {
            
            const isImage = /\.(jpg|jpeg|png)$/i.test(req.files[0].originalname);
            const isVideo = /\.(mp4)$/i.test(req.files[0].originalname);
      
            if (isImage || isVideo) {
              const uploadCloudinary = await cloudinary.uploader.upload(req.files[0].path, {
                resource_type: isImage ? 'image' : 'video'
              });
      
              const newPost = new postModel({
                user: user._id,
                description: req.body.content,
                media: uploadCloudinary.url,
              });
      
              await newPost.save();
              return res.json({ message: 'New post Added!', newPost });
            }
          }
      
          const newPost = new postModel({
            user: user._id,
            description: req.body.content
          });
      
          await newPost.save();
          res.json({ message: 'New Post Added' });

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