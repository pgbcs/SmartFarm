const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const orderController = require('../controller/order.controller');
const customerController = require('../controller/customer.controller');


const multer = require('multer');


const upload = multer();
router.get("/products/getMyProducts", productController.getAllProductBelongToCustomer);
router.get('/products/getAll', productController.getPaginatedProducts);
router.get('/products/getById', productController.getProductById);
// router.get('/products', );
router.get('/cart', (req, res) => {});

router.get('/orders/getAll', orderController.getPaginatedOrders); 
router.get('/orders/getById', orderController.getOrderById);
router.put('/orders/purchase/:id', orderController.purchaseOrder);
router.put('/orders/cancel/:id', orderController.cancelOrder);
router.post('/orders/create',upload.none(), orderController.createOrder);
router.get('/getFarmer', customerController.getFarmerById);


router.get('/profile', (req, res) => {});


module.exports = router;