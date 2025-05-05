import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { addChat, getChat, getChats, readChat } from '../controllers/chat.controller.js';
const router = express.Router();

router.get('/getChats',authMiddleware, getChats );
router.get('/:id',authMiddleware, getChat);
router.post('/',authMiddleware, addChat);
router.put('/read/:id',authMiddleware, readChat);


export default router