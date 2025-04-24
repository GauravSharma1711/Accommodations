import express from 'express'
import { register } from '../controllers/auth.controller.js';

import { validate } from '../middlewares/validator.middleware.js';
import { userRegistrationValidator } from '../validators/auth.js';

const router = express.Router()


router.post('/register',userRegistrationValidator(),validate,register);



export default router