import { Router } from 'express'; // เปลี่ยนเป็น import
import { query, body } from 'express-validator';

import * as controller from '../controllers/paymentController.js';
// const { validation } = require('../middlewares/validationMiddleware');
const router = Router();

router.post('/createPayment', [
    body('userId').notEmpty(),
    body('orderId').notEmpty(),
    body('paymentMethod').notEmpty(),
    body('quantity').notEmpty(),
    body('amount').notEmpty(),
], controller.createPayment);

router.get('/paymentsDetail', [
    query('paymentId').notEmpty(),
],  controller.paymentsDetail);

router.post('/completePayment', [
    body('paymentId').notEmpty(),
],  controller.completePayment);



export default router;