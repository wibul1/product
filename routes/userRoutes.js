import { Router } from 'express'; // เปลี่ยนเป็น import
import { query, body } from 'express-validator';

import * as controller from '../controllers/userController.js';
// const { validation } = require('../middlewares/validationMiddleware');
const router = Router();


router.post('/registerUser', [
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('name').notEmpty(),
    body('img').notEmpty(),
    body('address').notEmpty(),
    body('phoneNumber').notEmpty(),
    
], controller.registerUser);

router.post('/loginUser', [
    body('email').notEmpty(),
    body('password').notEmpty(),
], controller.loginUser);

module.exports = router;