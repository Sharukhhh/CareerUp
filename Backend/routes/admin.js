import express from 'express';
const router = express.Router();
import { adminLogin, getCompanies, getUsers } from '../controllers/admin/adminController.js';
import { verifyAdmin } from '../middlewares/adminAuth.js';

//auth
router.post('/' , adminLogin);

//user-management-routes
router.get('/users' , verifyAdmin,  getUsers);

//company-management-company
router.get('/companies' , verifyAdmin, getCompanies);


export default router;    