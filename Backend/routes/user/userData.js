import express from 'express';
import { addEducation, addProfession, deleteEducation, deleteProfession, editEducation, editProfession } from '../../controllers/user/userDataController.js';
const router = express.Router();

//routes-education of user
router.post('/add_edu/:id', addEducation);

router.put('/edit_edu/:id' , editEducation);

router.delete('/delete_edu/:educationId' , deleteEducation); 


//routes-profession of user
router.post('/add_pro/:id' , addProfession);

router.put('/edit_pro/:id' , editProfession);

router.delete('/delete_pro/:professionId' , deleteProfession);

export default router;