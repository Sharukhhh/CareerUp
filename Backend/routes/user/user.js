import express from 'express';
const router = express.Router();
import { verify } from '../../middlewares/userAuth.js';
import { addBasic, 
    createPost, deletePost, 
    getProfile, listAllUsers } from '../../controllers/user/userController.js';
import upload from '../../utils/multerSetup.js';

//profile-management
router.get('/profile/:id' ,  getProfile);

router.put('/editBasic/:id' , upload.array(2), addBasic);


router.get('/listusers' , verify , listAllUsers);

//user posts-management
router.post('/addPost' , upload.array(10), createPost);

router.patch('/deletepost/:id' , deletePost );

export default router;


