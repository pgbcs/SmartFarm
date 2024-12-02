const buildResponse = require('../util/buildRes.js');
const orderModel = require('../model/order.model.js');
const { Sequelize } = require('sequelize');
const db = require('../config/db.js');

class OrderController{
    async getPaginatedOrders(req, res){
        try{
            const page = parseInt(req.query.page) ||1;
            const perPage= parseInt(req.query.perPage) || 10;

            const customerID = parseInt(req.query.customerID, 10);
            
            const [results, count] = await orderModel.findAllWithPagination(
                [
                    'CALL get_customer_order_with_limit(:customer_id, :lim, :offs)',
                    {
                        replacements: {
                            customer_id: customerID,
                            lim: perPage,
                            offs: (page-1)*perPage,
                        },
                        type: Sequelize.QueryTypes.SELECT
                    }
                ]
            )
            console.log(results, count);
            const countResult  = count[0]?.total_rows;
            const totalPages = Math.ceil(countResult/perPage);
            res.json(buildResponse(Object.values(results), "List order", 200, {
                metaInfo: {
                    current: page,
                    perPage: perPage,
                    total: countResult,
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
}

module.exports = new OrderController(); 