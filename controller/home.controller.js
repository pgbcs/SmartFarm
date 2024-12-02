const sequenlize = require('../config/db.js');
const productModel = require('../model/product.model.js');


module.exports.index = (req,res) => {
    async function getProduct(){
        const product = await productModel.findAll();
        res.json(product);
    }
    getProduct();
}


