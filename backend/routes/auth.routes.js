import express from 'express'
import { login, logout, register } from '../controllers/auth.controller.js';

import { validate } from '../middlewares/validator.middleware.js';
import { userLoginValidator, userRegistrationValidator } from '../validators/auth.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router()


router.post('/register',userRegistrationValidator(),validate,register);
router.post('/login',userLoginValidator(),validate,login);
router.delete('/logout',authMiddleware,logout);


export default router