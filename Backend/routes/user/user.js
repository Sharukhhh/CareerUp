import express from 'express';
const router = express.Router();
import { verify } from '../../middlewares/userAuth.js';
import { addBasic, getProfile, listAllUsers } from '../../controllers/user/userController.js';
import { createPost , deletePost, getPosts, userOnlyPosts } from '../../controllers/user/postController.js';
import upload from '../../utils/multerSetup.js';

//profile-management
router.get('/profile/:id' ,  getProfile);

router.put('/editBasic/:id' , upload.array(2), addBasic);


router.get('/listusers' , verify , listAllUsers);

//user posts-management
router.post('/addPost/:id' , upload.array('image' , 'video'), createPost);

router.patch('/deletepost/:id' , deletePost );

router.get('/getposts' , verify ,  getPosts);

router.get('/userposts/:id' , verify, userOnlyPosts);

export default router;


