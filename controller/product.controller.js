const buildResponse = require('../util/buildRes.js');
const productModel = require('../model/product.model.js');
class ProductController{

    async getPaginatedProducts(req, res){
        try{
            const page = parseInt(req.query.page) || 1;
            const perPage= parseInt(req.query.perPage) || 10;

            const [count, rows] = await productModel.findProductNotSold({
                offset: (page-1)*perPage,
                limit: perPage
            });

            const totalPages =  Math.ceil(count/perPage);
            res.json(buildResponse(rows, "List product", 200, {
                metaInfo: {
                    current: page,
                    perPage: perPage,
                    total: count,
                    totalPages: totalPages
                }
            }));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }

    async getProductById(req, res){
        try{
            const id = req.query.id;
            const product = await productModel.findOne({id: id});
            res.json(buildResponse(product, "Product detail", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }

    // async createProduct(req, res){
    //     try{
    //         const {start_date, type, breed, status, price, growth_time} = req.body;
    //         const product = await productModel.create({
    //             name: name,
    //             price: price,
    //             description: description
    //         });
    //         res.json(buildResponse(product, "Create product successfully", 200));
    //     }
    //     catch(err){
    //         res.status(500).json({
    //             message: err.message
    //         });
    //     }
    // }
}

module.exports = new ProductController();