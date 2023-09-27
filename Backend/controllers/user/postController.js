import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js'; 
import postModel from '../../models/posts.js';
import cloudinary from '../../utils/cloudinary.js';


export const createPost = async (req, res, next) => {
  try {
    const images = req.files;
    console.log(images, "//////");
    const id = req.params.id;
    
    let user = await userModel.findById(id);
    
    if (!user) {
      const company = await companyModel.findById(id);
      
      if (!company) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      user = company;
    }

    let cloudimage = [];

    if (images && images.length > 0) {
      for (const image of images) {
        const result = await cloudinary.uploader.upload(image.path);
        cloudimage.push(result.secure_url);
      }
    }

    console.log(cloudimage, "this is my cloud image");

    const newPostData = {
      user: user._id,
      description: req.body.content,
      media: cloudimage,
    };

    if (!images || images.length === 0) {
      console.log('text only post');
      delete newPostData.media; 
    }

    const newPost = new postModel(newPostData);
    await newPost.save();

    res.json({ message: 'New Post Added', newPost });
  } catch (error) {
    next(error);
  }
};


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

// *********************************************************************************
// *********************************************************************************


export const likeandDislikePost = async (req, res, next) =>{
  try {
    const user = req.user;
    const postId = req.params.postId;

    const post  = await postModel.findById(postId);

    if(!post){
      return res.status(401).json({error : 'No post found'});
    }

    const isLiked = post.likes.includes(user._id);
    if(isLiked){

      post.likes = post.likes.filter((userId) => userId.toString() !== user._id.toString() );
      await post.save();

      return res.status(200).json({message: 'DisLiked Post'});
    } else {

      post.likes.push(user._id);
      await post.save();

      return res.status(200).json({message : 'Post Likes Successfully'});
    }
  } catch (error) {
    next(error);
  }
}

export const saveandUnsavePosts = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const user = req.user;

    const post = await postModel.findById(postId);

    if(!post){
      return res.status(404).json({error : 'Post Not Found'});
    }

    const isSaved = user.savedPosts.some((savedPosts) => savedPosts.postId.toString() === savedPosts.postId.toString())
    if(isSaved){
      user.savedPosts = user.savedPosts.filter((savedPosts) => savedPosts.postId.toString() !== savedPosts.postId.toString());

      await user.save();
      return res.json({message : 'Post Unsaved !'});

    } else {

      user.savedPosts.push({postId : post._id});
      await user.save();

      return res.json({message : 'Post Saved !'});
    }


  } catch (error) {
    next(error);
  }
}