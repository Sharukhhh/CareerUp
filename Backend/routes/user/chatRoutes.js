import express from 'express';
import { verify } from '../../middlewares/userAuth.js';
import { createGroupChat, showAllMessages, submitMessage } from '../../controllers/user/chatController.js';
const router = express.Router();

router.get('/createOrRetrieveChat' , verify , createGroupChat);

router.post('/chatSend' , verify , submitMessage);

router.get('/viewMessages/:chatId' , verify , showAllMessages);


export default router;