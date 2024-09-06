import { Router } from 'express'; // เปลี่ยนเป็น import
import { query, body } from 'express-validator';

import * as controller from '../controllers/orderController.js';
// const { validation } = require('../middlewares/validationMiddleware');
const router = Router();

router.get('/getOrdersByUser', [
    query('userId').notEmpty(),
    query('status').notEmpty(),
],  controller.getOrdersByUser);

router.post('/createOrder', [
    body('userId').notEmpty(),
    body('productId').notEmpty(),
    body('quantity').notEmpty(),
], controller.createOrder);

router.post('/deleteOrder', [
    body('idorder').notEmpty(),
],  controller.deleteOrder);

module.exports = router;