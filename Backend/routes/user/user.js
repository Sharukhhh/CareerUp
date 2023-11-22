import express from 'express';
const router = express.Router();
import { verify } from '../../middlewares/userAuth.js';
import {  getProfile, jobApplication, getApplicants, listAllUsers, search, listCompanies, 
    sendConnectionRequest, acceptConnectionRequest,  rejectConnectionRequest ,
    displayNotifications,  getChatUsers, updateApplicationStatus, displayConnections, followAndUnfollowCompany, ownProfile, clearNotifications} 
from '../../controllers/user/userController.js';
import { addBasic } from '../../controllers/user/userDataController.js';
import { addComment, createPost , deletePost, getPosts, getIndividualPosts,  
getSavedPosts,  likeandDislikePost, saveandUnsavePosts,  reportPost, deleteComment, getPostsForFeed } 
from '../../controllers/user/postController.js';
import upload from '../../utils/multerSetup.js';

//search
router.get('/search' , verify , search);

//profile-management
router.get('/ownProfile' , verify , ownProfile);

router.get('/profile/:id' , verify,  getProfile); 

router.get('/getConnections' , verify , displayConnections);

router.put('/addBasic' , verify, upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'resume', maxCount: 1 }]) , addBasic);

router.get('/listusers' , verify,  listAllUsers);

router.get('/companies' , verify , listCompanies);


//user posts-management
router.post('/addPost' , verify, upload.array('image' , 'video'), createPost);

router.patch('/deletepost/:postId' , verify, deletePost); 

router.get('/feedposts' , verify, getPostsForFeed);

router.get('/getposts' , verify,  getPosts);

router.get('/userposts/:id' , verify , getIndividualPosts);

router.get('/savedposts' , verify , getSavedPosts);

router.get('/like/:postId', verify, likeandDislikePost);

router.get('/save/:postId' , verify , saveandUnsavePosts);

router.post('/postcomment/:postId' , verify , addComment);

router.delete('/delete-comment/:commentId' , verify, deleteComment);

router.patch('/report/:postId' , verify , reportPost )


//user-connections
router.get('/send/:userId' , verify , sendConnectionRequest);

router.get('/accept/:userId' , verify , acceptConnectionRequest);

router.get('/reject/:userId' , verify , rejectConnectionRequest);

router.get('/follow-unfollow/:companyId' , verify , followAndUnfollowCompany);



//user-notifications
router.get('/notifies' , verify , displayNotifications);

router.delete('/clear' , verify , clearNotifications);

//user-job-application
router.get('/apply/:jobId' , verify , jobApplication);

router.get('/applicants/:jobId' , verify , getApplicants);

router.patch('/updateStatus/:applicationId' , verify , updateApplicationStatus);


export default router;


// upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'resume', maxCount: 1 }])