const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.add);
router.get('/:cid', cartController.getById);
router.post('/:cid/product/:pid', cartController.addProduct);

router.get('/realtime', (req, res) => {
    const products = productController.getAll();
    res.render('realTimeProducts', { products });
});


module.exports = router;
