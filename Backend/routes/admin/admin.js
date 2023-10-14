import express from 'express';
const router = express.Router();
import {
    adminLogin, getCompanies, getUsers, blockUser, unBlockUser ,
    verifyCompany ,blockCompany , unBlockCompany, addCategory, 
    deleteIndustry, getIndustries, getAllPosts, PostDelete, dashboardValues 
} 
from '../../controllers/admin/adminController.js';
import { verifyAdmin } from '../../middlewares/adminAuth.js';

//auth
router.post('/' , adminLogin);

//admin-dashboard 
router.get('/dashboard' , verifyAdmin , dashboardValues);



//user-management-routes
router.get('/users' , verifyAdmin,  getUsers);

router.patch('/block/:id' , verifyAdmin, blockUser);

router.patch('/unblock/:id' , verifyAdmin, unBlockUser);


//company-management-company
router.get('/companies', verifyAdmin, getCompanies);

router.patch('/verify/:id' , verifyAdmin, verifyCompany);

router.patch('/blockcompany/:id' , verifyAdmin, blockCompany );

router.patch('/unblockcompany/:id' , verifyAdmin, unBlockCompany);

router.post('/category' , verifyAdmin , addCategory);

router.get('/getIndustries' , verifyAdmin , getIndustries);

router.delete('/deleteCat/:industryId' , verifyAdmin , deleteIndustry);


//user-posts admin side
router.get('/posts' , verifyAdmin, getAllPosts);

router.get('/adminpostDelete/:postId' , verifyAdmin , PostDelete )


export default router;    