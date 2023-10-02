import express from 'express';
const router = express.Router();
import { verify } from '../../middlewares/userAuth.js';
import {connectAndDisconnectUser,  getProfile, listAllUsers, search } from '../../controllers/user/userController.js';
import { addBasic } from '../../controllers/user/userDataController.js';
import { addComment, createPost , deletePost, getPosts, getIndividualPosts,  getSavedPosts,  likeandDislikePost, saveandUnsavePosts, showComment } from '../../controllers/user/postController.js';
import upload from '../../utils/multerSetup.js';

//search
router.get('/search' , verify , search);

//profile-management
router.get('/profile/:id' , verify,  getProfile);

router.post('/addBasic/:id' , verify, addBasic);

router.get('/listusers' , verify,  listAllUsers);


//user posts-management
router.post('/addPost' , verify, upload.array('image' , 'video'), createPost);

router.patch('/deletepost/:postId' , verify, deletePost);

router.get('/getposts' , verify,  getPosts);

router.get('/userposts/:id' , verify , getIndividualPosts);

router.get('/savedposts' , verify , getSavedPosts);

router.get('/like/:postId', verify, likeandDislikePost);

router.get('/save/:postId' , verify , saveandUnsavePosts);

router.get('comments/:postId', verify, showComment);

router.post('/postcomment/:postId' , verify , addComment);


//user-connections
router.get('/connect/:userId' , verify , connectAndDisconnectUser);


export default router;


