const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const requireRole = require('../middlewares/role.middleware');


//public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

//private routes
router.post('/', authMiddleware, requireRole("ADMIN"), createProduct);
router.put('/:id', authMiddleware, requireRole("ADMIN"), updateProduct);
router.delete('/:id', authMiddleware, requireRole("ADMIN"), deleteProduct);

module.exports = router;
