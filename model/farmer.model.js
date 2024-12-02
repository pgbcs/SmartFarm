const { DataTypes } = require('sequelize');
const BaseModel = require('./base.model');


class FarmerModel extends BaseModel{
  constructor(){
    super('FARMER', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING,
        },
        Phone_number: {
            type: DataTypes.STRING,
        },
        Balance:{
            type: DataTypes.INTEGER,
        },
        Address:{
            type: DataTypes.STRING,
        },
        Username:{
            type: DataTypes.STRING,
        },
        Password:{
            type: DataTypes.STRING,
        },

    });
  }
}

module.exports = new FarmerModel();