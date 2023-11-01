import express from 'express';
import { verify } from '../../middlewares/userAuth.js';
import { findUserToChat, getCreatedChat, setupingChatWithSelectedUser, showAllMessages, submitMessage } from '../../controllers/user/chatController.js';
const router = express.Router();

router.post('/searchUser' , verify , findUserToChat);

router.post('/chat-setup' , verify , setupingChatWithSelectedUser);

router.get('/chatusers' , verify , getCreatedChat);

// router.get('/createOrRetrieveChat' , verify , createGroupChat);

router.post('/chatSend' , verify , submitMessage);

router.get('/viewMessages/:chatId' , verify , showAllMessages);


export default router;