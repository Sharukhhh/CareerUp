import express from 'express';
const router = express.Router();
import { verify } from '../middlewares/userAuth.js';
import { createPost, deletePost, listAllUsers } from '../controllers/user/userController.js';
import upload from '../utils/multerSetup.js';


router.get('/profile/:id' , verify ,  userProfile);


router.get('/listusers' , verify , listAllUsers);

//user posts-management
router.post('/addPost' , upload.array(10), createPost);

router.patch('/deletepost/:id' , deletePost );

export default router;


