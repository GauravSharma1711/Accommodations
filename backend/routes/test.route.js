import express from 'express'
import { shouldBeAdmin, shouldBeLoggedIn } from '../controllers/test.controller.js';

const router = express.Router();

router.get('/shouldBeLoggedIn',shouldBeLoggedIn)

router.get('/shouldBeAdmin',shouldBeAdmin)

export default router