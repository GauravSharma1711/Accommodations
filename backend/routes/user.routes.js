
import express from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/getUsers',getUsers);
router.get('/getUser/:id',getUser);
router.put('/updateUser/:id',updateUser);
router.delete('/deleteUser/:id',deleteUser);


export default router;