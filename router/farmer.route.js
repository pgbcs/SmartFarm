const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

const multer = require('multer');
const orderController = require('../controller/order.controller');


const upload = multer();

router.get('/products/getAll', productController.getAllProductBelongToFarmer );
router.post('/products/addProduct',upload.none(), productController.createProduct);
router.get("/orders/getAll", orderController.getPaginatedOrdersForFarmer);
router.put('/orders/confirm/:id', orderController.confirmOrder);
router.get('/orders/getById', orderController.getOrderById);
// router.put('/products/updateProduct', upload.none(), productController.updateProduct);
// router.delete('/products/deleteProduct', upload.none(), productController.deleteProduct); 

router.get('/products/getById', productController.getProductById);


module.exports = router;