const BaseModel = require('./base.model');


class FarmerModel extends BaseModel{
  constructor(){
    super('FARMER');
  }

}

module.exports = new FarmerModel();