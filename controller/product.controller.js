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
            const genType = req.query.genType;
            let product = null;
            if(genType === 'aqua'){
                product = await productModel.getDetailAquaProduct({id: id});
            }
            else if(genType === 'crop'){ 
                product = await productModel.getDetailCropProduct({id: id});
            }
            else if(genType === 'animal'){
                product = await productModel.getDetailAnimalProduct({id: id});
            }
            // const product = await productModel.getDetailProduct({id: id});
            res.json(buildResponse(product, "Product detail", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }

    async getAllProductBelongToCustomer(req, res){
        const page = parseInt(req.query.page) || 1;
        const perPage= parseInt(req.query.perPage) || 10;
        const customerID = parseInt(req.query.customerID, 10);
        const inorder = req.query.inorder||0;
        if(!customerID){
            return res.json(buildResponse({}, "Customer ID is required", 400));
        }
        const [count, rows] = await productModel.getAllProductBelongtoCustomer({
            customerID: customerID,
            offset: (page-1)*perPage,
            limit: perPage,
            inorder: inorder
        });
        const totalPages =  Math.ceil(count/perPage);
        res.json(buildResponse(rows, "List product", 200, {
            metaInfo: {
                current: page,
                perPage: perPage,
                total: count,
                totalPages: totalPages,
            }
        }));
    }

    async createProduct(req, res){
        try{
            const {start_date, type, breed, status, price, growth_time, genType} = req.body;
            const product = await productModel.create({
                name: name,
                price: price,
                description: description
            });
            res.json(buildResponse(product, "Create product successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports = new ProductController();