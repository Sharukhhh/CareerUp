import express from 'express';
const router = express.Router();
import { adminLogin } from '../controllers/admin/adminController.js';

router.post('/' , adminLogin);


export default router;