
import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/getUsers',getUsers);
router.get('/getUser/:id',getUser);
router.put('/updateUser/:id',authMiddleware,updateUser);
router.delete('/deleteUser/:id',deleteUser);


export default router;