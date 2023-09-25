import express from 'express';
import { addEducation, addProfession, createJob, deleteEducation, deleteProfession, editEducation, editProfession } from '../../controllers/user/userDataController.js';
const router = express.Router();
import { verify } from '../../middlewares/userAuth.js';

//routes-education of user
router.post('/add_edu/:id', addEducation);

router.put('/edit_edu/:id' , editEducation);

router.delete('/delete_edu/:educationId' , deleteEducation); 


//routes-profession of user
router.post('/add_pro/:id' , addProfession);

router.put('/edit_pro/:id' , editProfession);

router.delete('/delete_pro/:professionId' , deleteProfession);


//routes-job posts of company
router.post('/postjob/:id' , createJob);

export default router;