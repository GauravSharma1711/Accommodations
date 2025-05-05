import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { addMessage } from '../controllers/message.controller.js';
const router = express.Router();

router.post('/:chatId',authMiddleware,addMessage);

export default router