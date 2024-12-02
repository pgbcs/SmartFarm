const buildResponse = require('../util/buildRes.js');
const orderModel = require('../model/order.model.js');


class OrderController{
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
                where: {
                    id: id
                }
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
            const order = await orderModel.create({
                customerID: customerID,
                productID: productID,
            });
            res.json(buildResponse(order, "Create order successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports = new OrderController(); 