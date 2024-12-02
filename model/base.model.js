const db = require('../config/db');
const {Sequelize, DataTypes} = require('sequelize');

class BaseModel{
    constructor(modelName, schema){
        this.model = db.define(modelName, schema);
    }   

    //tạo mới bản ghi
    async create(data){
        try{
            const result = await this.model.create(data);
            return result;
        }
        catch(err){
            throw new Error('Error when create new record'+err.message);
        }
    }

    //lấy tất cả bản ghi
    async findAll(){
        try{
            const result = await this.model.findAll();
            return JSON.stringify(result,null,2);
        }
        catch(err){
            throw new Error('Error when get all record'+err.message);
        }
    }

    async findAndCountAll(options){
        try{
            const result = await this.model.findAndCountAll(options);
            return result;
        }
        catch(err){
            throw new Error('Error when get all record'+err.message);
        }
    }

    //Cập nhật bản ghi
    async update(data, options){
        try{
            const result = await this.model.update(data, options);
            return result;
        }
        catch(err){
            throw new Error('Error when update record'+err.message);
        }
    }

    //Xóa bản ghi
    async delete(options){
        try{
            const result = await this.model.destroy(options);
            return result;
        }
        catch(err){
            throw new Error('Error when delete record'+err.message);
        }
    }
}

module.exports = BaseModel;