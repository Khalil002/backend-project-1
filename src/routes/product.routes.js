const { Router } = require('express');
const router = Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
