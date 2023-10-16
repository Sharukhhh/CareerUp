import express from 'express';
import { verify } from '../../middlewares/userAuth.js';
import { showAllMessages, submitMessage } from '../../controllers/user/chatController.js';
const router = express.Router();

router.post('/chatSend' , verify , submitMessage);

router.get('/viewMessages/:recieverId' , verify , showAllMessages);


export default router;