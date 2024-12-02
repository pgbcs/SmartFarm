const { DataTypes } = require('sequelize');
const BaseModel = require('./base.model');


class CustomerModel extends BaseModel{
  constructor(){
    super('CUSTOMER');}
}

module.exports = new CustomerModel();



