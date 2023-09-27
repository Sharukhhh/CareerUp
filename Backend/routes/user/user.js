import express from 'express';
const router = express.Router();
import { verify } from '../../middlewares/userAuth.js';
import { getProfile, listAllUsers } from '../../controllers/user/userController.js';
import { addBasic } from '../../controllers/user/userDataController.js';
import { createPost , deletePost, getPosts,  likeandDislikePost, saveandUnsavePosts } from '../../controllers/user/postController.js';
import upload from '../../utils/multerSetup.js';

//profile-management
router.get('/profile/:id' , verify,  getProfile);

router.put('/addBasic/:id' , upload.single('profileImage'), addBasic);


router.get('/listusers' , verify,  listAllUsers);

//user posts-management
router.post('/addPost/:postId' , upload.array('image' , 'video'), createPost);

router.patch('/deletepost/:postId' , deletePost);

router.get('/getposts' , verify,  getPosts);

router.get('/like/:postId', verify, likeandDislikePost);

router.get('/save/:postId' , verify , saveandUnsavePosts);


export default router;


