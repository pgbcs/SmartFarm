const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');


router.get('/products/getAll', productController.getPaginatedProducts);
router.get('/products/getById', productController.getProductById);
// router.get('/products', );

router.get('/cart', (req, res) => {});

router.get('/orders', (req, res) => {}); 

router.get('/profile', (req, res) => {});


module.exports = router;