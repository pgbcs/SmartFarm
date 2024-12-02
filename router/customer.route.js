const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');


router.get('/products', productController.getPaginatedProducts);

router.get('/cart', (req, res) => {});

router.get('/orders', (req, res) => {}); 

router.get('/profile', (req, res) => {});


module.exports = router;