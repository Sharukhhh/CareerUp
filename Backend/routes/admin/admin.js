import express from 'express';
const router = express.Router();
import {
    adminLogin, getCompanies, getUsers, blockUser, unBlockUser ,
    verifyCompany ,blockCompany , unBlockCompany 
} 
from '../../controllers/admin/adminController.js';
import { verifyAdmin } from '../../middlewares/adminAuth.js';

//auth
router.post('/' , adminLogin);


//user-management-routes
router.get('/users' , verifyAdmin,  getUsers);

router.patch('/block/:id' , verifyAdmin, blockUser);

router.patch('/unblock/:id' , verifyAdmin, unBlockUser);


//company-management-company
router.get('/companies', verifyAdmin, getCompanies);

router.patch('/verify/:id' , verifyAdmin, verifyCompany);

router.patch('/blockcompany/:id' , verifyAdmin, blockCompany );

router.patch('/unblockcompany/:id' , verifyAdmin, unBlockCompany);


export default router;    