import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js'; 
import commentModel from '../../models/comments.js';
import postModel from '../../models/posts.js';
import cloudinary from '../../utils/cloudinary.js';
import mongoose, { mongo } from 'mongoose';


export const createPost = async (req, res, next) => {
  try {
    const images = req.files;
    // const id = req.params.id;
    const user = req.user;

    let cloudimage = [];

    if (images && images.length > 0) {
      for (const image of images) {
        const result = await cloudinary.uploader.upload(image.path);
        cloudimage.push(result.secure_url);
      }
    }

    console.log(cloudimage, "this is my cloud image");

    if(user.role === 'Candidate'){
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

    } else {

      const newPostData = {
        company: user._id,
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
    }


  } catch (error) {
    next(error);
  }
};


export const deletePost = async (req, res , next) => {
    try {

        const postId = req.params.postId;

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
    const posts = await postModel.find()
    .populate('user')
    .populate('company')
    .populate('comments').exec();

    if(!posts){
      return res.status(404).json({error : 'No posts found'});
    }

    res.status(200).json({message : 'Posts available' , posts});
  } catch (error) {
    next(error);
  }
}

export const getIndividualPosts = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    const posts = await postModel.find({user : userObjectId})
    .populate('user').populate('company');

    if(!posts){
      return res.status(404).json({error : 'Users post not found'});
    }

    console.log(posts);

    return res.status(200).json({message : 'Posts avaialable' , posts});
  } catch (error) {
    next(error);
  }
}


export const getSavedPosts = async (req, res, next) => {
  try {
    const user = req.user;

    const posts = user.savedPosts;

    if(!posts){
      return res.status(404).json({error : 'Saved posts not found'});
    }

    return res.status(200).json({message : 'Saved Posts' , posts});
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

// *********************************************************************************
// *********************************************************************************

export const showComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const postWithComments = await postModel.findById(postId).populate('comments').exec();

    if(!postWithComments){
      return res.status(404).json({error : 'Post not found'});
    }

    const comments = postWithComments.comments;
    return res.json({message : 'success', comments});

  } catch (error) {
    next(error);
  }
}


export const addComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const user = req.user;
    const {text} = req.body;

    const findPost = await postModel.findById(postId);
    if(!findPost){
      return res.status(404).json({error : 'Post not found'});
    }

    if(user.role === 'Candidate'){
      const newComment = new commentModel({
        text, userId : user._id , postId
      })
  
      await newComment.save();
  
      findPost.comments.push(newComment._id);
      await findPost.save();

    } else {

      const newComment = new commentModel({
        text, companyId : user._id , postId
      });
  
      await newComment.save();
  
      findPost.comments.push(newComment._id);
      await findPost.save();
    }

    return res.json({message : 'Comment Added'});

  } catch (error) {
    next(error);
  }
}


export const deleteComment = async(req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const user = req.user;


  } catch (error) {
    next(error);
  }
}

// *********************************************************************************
// *********************************************************************************


export const reportPost = async(req, res, next) => {
  try {
    const postId = req.params.postId;
    const user = req.user;

    const {reason} = req.body;

    const post = await postModel.findByIdAndUpdate(postId , {
      $push : {
        reports : {
          user: user._id, reason: reason
        },
      },
    } , {new : true});

    if(!post){
      return res.status(404).json({error : 'Post not found'});
    }

    return res.status(200).json({message : 'Report Submitted!'});

  } catch (error) {
    next(error);
  }
}