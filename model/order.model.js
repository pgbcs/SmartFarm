const BaseModel = require('./base.model');
const { DataTypes } = require('sequelize');

class OrderModel extends BaseModel{
    constructor(){
        super('ORDERS');
    }

    async findAllWithPagination(options){
        const { customerID,offset, limit } = options;

        try{
            const [result] = await this.db.promise().query(
                `CALL get_customer_order_with_limit(?, ?, ?)`,
                [customerID, limit, offset]
            );
            
            // Trả về kết quả sau khi gọi thủ tục
            return [result[1][0]['COUNT(*)'], result[0]];
        }
        catch(err){
            throw new Error('Error fetching all records: ' + err.message);
        }
    }
}

module.exports = new OrderModel();