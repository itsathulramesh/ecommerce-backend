const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { createOrder, getOrder, getOrderById } = require('../controllers/order.controller');
const router = express.Router();

router.use(authMiddleware);

router.post('/',createOrder);
router.get('/',getOrder);
router.get('/:id',getOrderById);


module.exports = router;