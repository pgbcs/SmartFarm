
const productModel = require('../model/product.model.js');
class ProductController{
    async getPaginatedProducts(req, res){
        try{
            const page = parseInt(req.query.page) || 1;
            const perPage= parseInt(req.query.perPage) || 10;

            const {count, rows} = await productModel.findAndCountAll({
                offset: (page-1)*perPage,
                limit: perPage
            });

            const totalPages = Math.ceil(count/perPage);

            res.json({
                data: rows,
                metaInfo: {
                    current: page,
                    perPage: perPage,
                    total: count,
                    totalPages: totalPages,
                }
            })
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports = new ProductController();