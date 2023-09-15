import express from 'express';
const router = express.Router();

import { register , login , logout, googleSignup, googleLogin } from "../controllers/user/authController.js";

 
router.post('/register' , register);

router.post('/login' , login);

router.get('/logout' , logout);

router.post('/google', googleSignup);

router.post('/google/login' , googleLogin);


export default router;