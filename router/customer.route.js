const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const orderController = require('../controller/order.controller');

router.get('/products/getAll', productController.getPaginatedProducts);
router.get('/products/getById', productController.getProductById);
// router.get('/products', );
router.get('/cart', (req, res) => {});

router.get('/orders/getAll', orderController.getPaginatedOrders); 
router.get('/orders/getById', orderController.getOrderById);

router.get('/profile', (req, res) => {});


module.exports = router;