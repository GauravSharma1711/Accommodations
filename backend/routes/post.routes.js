
import express from 'express'
import { createPost, deletePost, 
    getPostById, getPosts, updatePost } from '../controllers/post.controller.js';
    import {authMiddleware} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get('/getPosts',getPosts);
router.get('/getPostById/:id',getPostById);
router.post('/createPost',authMiddleware,createPost);
router.post('/updatePost/:id',authMiddleware,updatePost);
router.delete('/deletePost/:id',authMiddleware,deletePost);



export default router;