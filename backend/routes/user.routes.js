
import express from 'express'
import { acceptFriendRequest, deleteUser, getFriendRequest, getMyFriends, getOutgoingFriendRequest, getUser, getUsers, profilePost, savePost, sendFriendRequest, updateUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/getUsers',authMiddleware,getUsers);
router.get('/getUser/:id',authMiddleware,getUser);
router.put('/updateUser/:id',authMiddleware,updateUser);
router.delete('/deleteUser/:id',authMiddleware,deleteUser);
router.post('/savePost',authMiddleware,savePost);
router.get('/profilePost/:id',authMiddleware,profilePost);

// ----------------------------

router.get('/friends',authMiddleware,getMyFriends);
router.post('/friend-request/:id',authMiddleware,sendFriendRequest)
router.get('/outgoing-friend-requests',authMiddleware,getOutgoingFriendRequest)


router.put('/friend-request/:id/accept',authMiddleware,acceptFriendRequest)
router.get('/friend-requests',authMiddleware,getFriendRequest)

export default router;