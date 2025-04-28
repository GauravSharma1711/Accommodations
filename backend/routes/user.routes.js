
import express from 'express'
import { deleteUser, getUser, getUsers, profilePost, savePost, updateUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/getUsers',getUsers);
router.get('/getUser/:id',getUser);
router.put('/updateUser/:id',authMiddleware,updateUser);
router.delete('/deleteUser/:id',deleteUser);
router.post('/savePost',authMiddleware,savePost);
router.get('/profilePost/:id',authMiddleware,profilePost);

export default router;