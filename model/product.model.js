const BaseModel = require('./base.model');
const { DataTypes } = require('sequelize');


class ProductModel extends BaseModel{
    constructor(){
        super('PRODUCT', {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Start_date: {
                type: DataTypes.DATE,
            },
            Type:{
                type: DataTypes.STRING,
            },
            Breed:{
                type: DataTypes.STRING,
            },
            Status:{
                type: DataTypes.STRING,
            },
            Price:{
                type: DataTypes.INTEGER,
            },
            Growth_time:{
                type: DataTypes.DATE,
            },
            Order_ID:{
                type: DataTypes.INTEGER,
            },
            Main_ID:{
                type: DataTypes.INTEGER,
            },
            Discount:{
                type: DataTypes.INTEGER,
            },
            Delivery_time:{
                type: DataTypes.DATE,
            }
        });
    }
}

module.exports = new ProductModel();