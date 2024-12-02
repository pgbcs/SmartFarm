const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

const multer = require('multer');


const upload = multer();

router.post('/products/addProduct',upload.none(), productController.getPaginatedProducts);

router.get('/products/getById', productController.getProductById);


module.exports = router;