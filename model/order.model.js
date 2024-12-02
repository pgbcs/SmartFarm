const BaseModel = require('./base.model');
const { DataTypes } = require('sequelize');

class OrderModel extends BaseModel{
    constructor(){
        super('ORDERS', {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Time_created: {
                type: DataTypes.DATE,
            },
            Status:{
                type: DataTypes.STRING,
            },
            Time_sold:{
                type: DataTypes.INTEGER,
            },
            Farmer_ID:{
                type: DataTypes.DATE,
            },
            Customer_ID:{
                type: DataTypes.INTEGER,
            },
        });
    }
}

module.exports = new OrderModel();