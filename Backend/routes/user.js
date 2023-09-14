import express from 'express';
const router = express.Router();
import { verify } from '../middlewares/userAuth.js';
import { userProfile } from '../controllers/user/userController.js';


router.get('/profile/:id' ,  userProfile);



export default router;


