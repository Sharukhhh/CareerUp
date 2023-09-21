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
router.get('/users' ,  getUsers);

router.patch('/block/:id' , blockUser);

router.patch('/unblock/:id' , unBlockUser);


//company-management-company
router.get('/companies' , getCompanies);

router.patch('/verify/:id' , verifyCompany);

router.patch('/blockcompany/:id' , blockCompany );

router.patch('/unblockcompany/:id' , unBlockCompany);


export default router;    