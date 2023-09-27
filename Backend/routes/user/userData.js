import express from 'express';
import { addEducation, addProfession, createJob, deleteEducation, deleteProfession, editEducation, editProfession, getEditData } from '../../controllers/user/userDataController.js';
const router = express.Router();
import { verify } from '../../middlewares/userAuth.js';

//getting for edit data
router.get(`/editdata/:id` , verify , getEditData);

//routes-education of user
router.post('/add_edu/:id', verify, addEducation);

router.put('/edit_edu/:id' ,verify, editEducation);

router.delete('/delete_edu/:educationId' ,verify, deleteEducation); 


//routes-profession of user
router.post('/add_pro/:id' ,verify, addProfession);

router.put('/edit_pro/:id' ,verify, editProfession);

router.delete('/delete_pro/:professionId' ,verify, deleteProfession);


//routes-job posts of company
router.post('/postjob/:id' ,verify, createJob);

export default router;