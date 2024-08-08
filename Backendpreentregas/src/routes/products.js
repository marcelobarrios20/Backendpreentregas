const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAll);
router.get('/:pid', productController.getById);
router.post('/', productController.add);
router.put('/:pid', productController.update);
router.delete('/:pid', productController.delete);

module.exports = router;
