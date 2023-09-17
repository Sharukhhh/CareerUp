import express from 'express';
const router = express.Router();

import { register , login , googleSignup, googleLogin } from "../controllers/user/authController.js";

 
router.post('/register' , register);

router.post('/login' , login);

router.post('/google', googleSignup);

router.post('/google/login' , googleLogin);


export default router;