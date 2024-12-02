const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const multer = require('multer');


const upload = multer();

router.post('/login/farmer', upload.none(), authController.famerLogin);
router.post('/login/customer', upload.none(), authController.customerLogin);

router.post('/register/farmer', upload.none(), authController.farmerRegister);
router.post('/register/customer', upload.none(), authController.customerRegister);  

module.exports = router;