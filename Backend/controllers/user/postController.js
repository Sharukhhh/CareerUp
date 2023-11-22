import userModel from '../../models/userModel.js';
import companyModel from '../../models/companyModel.js'; 
import notifyModel from '../../models/notificationModel.js';
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

      await newPost.populate('user');
  
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

      await newPost.populate('company');
  
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


export const getPostsForFeed = async (req, res, next) => {
  try {
    const posts = await postModel.find({isDeleted : false})
    .populate('user')
    .populate('company')
    .populate({
      path : 'comments',
      populate : {
        path : 'userId companyId',
        select : 'name profileImage headline'
      }
    });

    if(!posts){
      return res.status(404).json({error : 'Not Found'});
    }

    res.status(200).json({message : 'Posts available' , posts});

  } catch (error) {
    next(error);
  }
}

export const getPosts = async (req, res, next) => {
  try {

    const user = req.user;

    const userId = new mongoose.Types.ObjectId(user._id);

    if(user.role === 'Candidate'){
      const posts = await postModel.find({user : userId , isDeleted: false })
      .populate('user')
      .populate('company')
      .populate({
        path : 'comments',
        populate : {
          path : 'userId companyId',
          select : 'name profileImage headline'
        }
      })
      .populate();
  
      if(!posts){
        return res.status(404).json({error : 'No posts found'});
      }
  
      res.status(200).json({message : 'Posts available' , posts});

    } else if(user.role === 'Company'){

      const posts = await postModel.find({company : userId ,  isDeleted: false })
      .populate('user')
      .populate('company')
      .populate({
        path : 'comments',
        populate : {
          path : 'userId companyId',
          select : 'name profileImage headline'
        }
      })
      .populate();
  
      if(!posts){
        return res.status(404).json({error : 'No posts found'});
      }
  
      res.status(200).json({message : 'Posts available' , posts});
    }

  } catch (error) {
    next(error);
  }
}

export const getIndividualPosts = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = req.user;

    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    if(user.role === 'Candidate'){
      let posts = await postModel.find({user : userObjectId , isDeleted : false})
      .populate('user')
      .populate({
        path : 'comments',
        populate : {
          path : 'userId companyId',
          select : 'name profileImage headline'
        }
      });

      if(!posts){
        return res.status(404).json({error : 'Post not found'});
      }

      return res.status(200).json({message : 'Posts avaialable' , posts});


    } else if (user.role === 'Company'){

      let posts = await postModel.find({company : userObjectId , isDeleted : false})
      .populate('company')
      .populate({
        path : 'comments',
        populate : {
          path : 'userId companyId',
          select : 'name profileImage headline'
        }
      });

      if(!posts){
        return res.status(404).json({error : 'Post not found'});
      }

      return res.status(200).json({message : 'Posts avaialable' , posts});
    }
    
  } catch (error) {
    next(error);
  }
}


export const getSavedPosts = async (req, res, next) => {
  try {
    const user = req.user;

    let currentUser = await userModel.findById(user._id)
    .populate({
      path: 'savedPosts.postId',
      populate: {
        path: 'user',
        model: 'users', 
      },
    });

    if(!currentUser){
      currentUser = await companyModel.findById(user._id)
      .populate({
        path: 'savedPosts.postId',
        populate: {
          path: 'company',
          model: 'companies',
        },
      });

      if(!currentUser){
        return res.status(404).json({error : 'Saved not found'});
      }
    }

    // Iterate over saved posts
    const savedPosts = currentUser.savedPosts.map((savedPost) => savedPost.postId);
    console.log(savedPosts);

    return res.status(200).json({message : 'Saved Posts' , posts :  savedPosts});
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

    const post  = await postModel.findById(postId).populate('user').populate('company');

    if(!post){
      return res.status(401).json({error : 'No post found'});
    }

    const isLiked = post.likes.includes(user._id);
    if(isLiked){

      post.likes = post.likes.filter((userId) => userId.toString() !== user._id.toString() );
      await post.save();


      if(post.user._id.toString() !== user._id.toString() ){
        await notifyModel.deleteOne({
          message : `${user.name} Liked Your Post`,
          receiverUser : post.user,
          senderUser : user._id,
          post : post._id,
          type : 'posts'
        })
      }

      return res.status(200).json({message: 'DisLiked Post'});

    } else {

      if(post.user._id.toString() === user._id.toString()){
        post.likes.push(user._id);
        await post.save();

      } else {

        post.likes.push(user._id);
        await post.save();
  
        await notifyModel.create({
          message : `${user.name} Liked Your Post`,
          receiverUser : post.user,
          senderUser : user._id,
          post : post._id,
          type : 'posts'
        });
  
      }

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

    const isSaved = user.savedPosts.some((savedPosts) => savedPosts.postId.toString() === postId.toString());
    if(isSaved){
      user.savedPosts = user.savedPosts.filter((savedPosts) => savedPosts.postId.toString() !== postId.toString());

      await user.save();
      return res.json({message : 'Post Unsaved !'});

    } else {

      user.savedPosts.push({postId : post._id});
      await user.save();

      return res.json({message : 'Post Saved !' });
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

    const postWithComments = await postModel.findById(postId).populate({
      path : 'comments.userId ', 
      select : 'name profileImage'
    }).exec();

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

    const findPost = await postModel.findById(postId).populate('user').populate('company');
    if(!findPost){
      return res.status(404).json({error : 'Post not found'});
    }

    if(user.role === 'Candidate'){
      const newComment = new commentModel({
        text, userId : user._id , postId
      })
  
      await newComment.save();
  
      if(findPost.user._id.toString() === user._id.toString()){
        findPost.comments.push(newComment._id);
        await findPost.save();

      } else {

        findPost.comments.push(newComment._id);
        await findPost.save();
  
        await notifyModel.create({
          senderUser : user._id,
          receiverUser : findPost.user,
          type : 'posts',
          message: `${user.name} commented on your post`,
          post : findPost._id
        })
      }

    } else {

      const newComment = new commentModel({
        text, companyId : user._id , postId
      });
  
      await newComment.save();

      if(findPost.user._id.toString() === user._id.toString()){
        findPost.comments.push(newComment._id);
        await findPost.save();
        
      } else {

        findPost.comments.push(newComment._id);
        await findPost.save();
  
        await notifyModel.create({
          senderUser : user._id,
          receiverUser : findPost.user,
          type : 'posts',
          message: `${user.name} commented on your post`,
          post : findPost._id
        })
      }
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

    const comment = await commentModel.findByIdAndDelete(commentId);

    if(!comment){
      return res.status(400).json({error : 'no comment'});
    }

    return res.status(200).json({message : 'Comment deleted '});
    
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