import express from 'express';
const router = express.Router();
import { verify } from '../middlewares/userAuth.js';
import { userProfile } from '../controllers/userController.js';


router.get('/profile' , verify, userProfile);



export default router;


