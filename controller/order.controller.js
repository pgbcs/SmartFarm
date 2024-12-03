const buildResponse = require('../util/buildRes.js');
const orderModel = require('../model/order.model.js');
const productModel = require('../model/product.model.js');


class OrderController{
    async getPaginatedOrdersForFarmer(req, res){
        try{
            const page = parseInt(req.query.page) ||1;
            const perPage= parseInt(req.query.perPage) || 10;

            const farmerID = parseInt(req.query.farmerID, 10); 

            const [count, rows] = await orderModel.findAllWithPaginationForFarmer({
                farmerID: farmerID,
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
                message: err.message});
            }
}
    async getPaginatedOrders(req, res){
        try{
            const page = parseInt(req.query.page) ||1;
            const perPage= parseInt(req.query.perPage) || 10;

            const customerID = parseInt(req.query.customerID, 10); 

            const [count, rows] = await orderModel.findAllWithPagination({
                customerID: customerID,
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

    async getOrderById(req, res){
        try{
            const id = req.query.id;
            const order = await orderModel.findOne({
                    id: id
            });
            res.json(buildResponse(order, "Order detail", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }

    async createOrder(req, res){
        try{
            const {customerID, productID} = req.body;
            //check productID is not belong to any order
            
                // Check productID is not belong to any order
            for (const id of productID) {
                const product = await productModel.findOne({ id });

                if (product.Status !== "not sold") {
                    return res.json(buildResponse(null, "Product is not available", 400));
                }
            }


            const orderList ={};
            


            const farmerPromises = productID.map((productID) => productModel.getFarmer({productID: productID}));
            try{
                const farmer = await Promise.all(farmerPromises);
                productID.forEach((el, index)=>{
                    if(!orderList[farmer[index][0].Farmer_ID]) orderList[farmer[index][0].Farmer_ID] = [];
                    orderList[farmer[index][0].Farmer_ID].push(el);
                })
            }catch(err){
                console.log(err);
            }
            // console.log(orderList);
            Object.keys(orderList).forEach(async (farmerID)=>{
                console.log(farmerID);
                const order = await orderModel.create({
                    Customer_ID: customerID,
                    Farmer_ID: farmerID,
                    Time_created: new Date(),
                    status: "unpaid",
                });
                const orderID = order.insertId;
                orderList[farmerID].forEach(async (productID)=>{
                    try{await productModel.addProductToOrder({
                        Order_ID: orderID,
                        id: productID,
                        status: "processing",
                    });}
                    catch(err){
                        console.log(err);
                    }
                });
            });
            res.json(buildResponse(null, "Create order successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }

    async purchaseOrder(req, res){
        try{
            const id = req.params.id;
            
            const order = await orderModel.findOne({
                id: id
            });
            console.log(order);
            if(order.Status !== "unpaid"){
                return res.json(buildResponse(null, "Order is not available", 400));
            }
            await orderModel.update(
                id,{
                Status: "paid-pending"//wait for farmer to confirm
            });
            // const products = await productModel.findProductByOrder({
            //     orderID: orderID
            // });
            // products.forEach(async (product)=>{
            //     await productModel.updateProduct({
            //         id: product.ID,
            //         status: "sold"
            //     });
            // });
            res.json(buildResponse(null, "Purchase order successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }

    async cancelOrder(req, res){
        try{
            const id = req.params.id;
            const order = await orderModel.findOne({
                id: id
            });
            if(order.Status !== "unpaid"){
                return res.json(buildResponse(null, "Order can not be cancelled", 400));
            }
            await orderModel.delete(id);
            // const products = await productModel.findProductByOrder({
            //     orderID: orderID
            // });
            // products.forEach(async (product)=>{
            //     await productModel.updateProduct({
            //         id: product.ID,
            //         status: "not sold"
            //     });
            // });
            res.json(buildResponse(null, "Cancel order successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
    });
    }
    }
    async confirmOrder(req, res){
        try{
            const id = req.params.id;
            const order = await orderModel.findOne({
                id: id
            });

            if(order.Status !== "paid-pending"){
                return res.json(buildResponse(null, "Order can not be confirmed", 400));
            }
            await orderModel.update(
                id,{
                Status: "accepted"
            });
            res.json(buildResponse(null, "Confirm order successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports = new OrderController(); 