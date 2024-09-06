import { Router } from 'express'; // เปลี่ยนเป็น import
import { query, body } from 'express-validator';

import * as controller from '../controllers/bookProductController.js';
// const { validation } = require('../middlewares/validationMiddleware');
const router = Router();

router.get('', [
    query('id').notEmpty(),
],  controller.product);

router.post('/putproduct', [
    body('uid').notEmpty(),
    body('img').notEmpty(),
    body('name').notEmpty(),
    body('author').notEmpty(),
    body('format').notEmpty(),
    body('book_depository_stars').notEmpty(),
    body('price').notEmpty(),
    body('currency').notEmpty(),
    body('old_price').notEmpty(),
    body('category').notEmpty(),
], controller.putproduct);

router.get('/book', [
    query('category').notEmpty(),
],  controller.productbook);

router.get('/carousel', [
],  controller.carousel);

router.post('/carousel', [
    body('name').notEmpty(),
    body('img').notEmpty(),
],  controller.carousel);

router.get('/searchbook', [
    query('namebook').notEmpty(),
], controller.searchbook);

router.get('/highestScore', [
], controller.highestScore);

router.get('/newBook', [
], controller.newBook);

router.get('/newBookAll', [
], controller.newBookAll);

export default router;