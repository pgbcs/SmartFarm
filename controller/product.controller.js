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
            let product = null;
            const {start_date, type, breed, price, growth_time, genType} = req.body;
            console.log(req.body);
            if(genType==="animal"){
                const {start_weight, gender, poultry, shelter_ID} = req.body.animal;
                if(poultry){
                    product = await productModel.createPoultry({
                        Start_date: start_date,
                        Type: type,
                        Breed: breed,
                        Price: price,
                        Growth_time: growth_time,
                        gen_type: genType,
                        Start_weight: start_weight,
                        Gender: gender,
                        Egg: poultry.egg,
                        shelter_ID: shelter_ID,
                    });
                }else{
                    product = await productModel.createLiveStock({
                        Start_date: start_date,
                        Type: type,
                        Breed: breed,
                        Price: price,
                        Growth_time: growth_time,
                        gen_type: genType,
                        Start_weight: start_weight,});
                }   
                // product = await productModel.create({
            }
            else if(genType==="crop"){
                const {area, estimated_haversting_cost,soil_ID} = req.body.crop;
                product = await productModel.createCrop({
                    Start_date: start_date,
                    Type: type,
                    Breed: breed,
                    Price: price,
                    Growth_time: growth_time,
                    gen_type: genType,
                    Area: area,
                    Estimated_harvesting_cost: estimated_haversting_cost,
                    Soil_ID: soil_ID
                });
            }   
            else if(genType==="aqua"){
                const {pond_ID} = req.body.aqua;
                product = await productModel.createAqua({
                    Start_date: start_date,
                    Type: type,
                    Breed: breed,
                    Price: price,
                    Growth_time: growth_time,
                    gen_type: genType,
                    Pond_ID: pond_ID
                });
            }
            // const product = await productModel.create({
            //     Start_date: start_date,
            //     Type: type,
            //     Breed: breed,
            //     Status: "not sold",
            //     Price: price,
            //     Growth_time: growth_time,
            //     gen_type: genType,
            // });
            // console.log(data);
            res.json(buildResponse(product, "Create product successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }

    async getAllProductBelongToFarmer(req, res){
        const page = parseInt(req.query.page) || 1;
        const perPage= parseInt(req.query.perPage) || 10;
        const farmerID = parseInt(req.query.farmerID, 10);

        if(!farmerID){
            return res.json(buildResponse({}, "Farmer ID is required", 400));
        }
        const [count, rows] = await productModel.getAllProductBelongtoFarmer({
            farmerID: farmerID,
            offset: (page-1)*perPage,
            limit: perPage,
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
}

module.exports = new ProductController();