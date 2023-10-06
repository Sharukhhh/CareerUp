import express from 'express';
const router = express.Router();

import { register , login , googleSignup, googleLogin, otpRegister } from "../../controllers/user/authController.js";

 
router.post('/register' , register);

router.post('/otpregister' , otpRegister);

router.post('/resend'  , register);

router.post('/login' , login);

router.post('/google', googleSignup);

router.post('/google/login' , googleLogin);


export default router;