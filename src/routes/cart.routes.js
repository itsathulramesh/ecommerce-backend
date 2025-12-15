const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { getCart, addToCart, updateCartItem, removeCartItem   } = require('../controllers/cart.controller');
const router = express.Router();

router.use(authMiddleware);

router.get("/", getCart);
router.post('/',addToCart);
router.put('/:productId',updateCartItem);
router.delete('/:productId',removeCartItem )

module.exports = router;