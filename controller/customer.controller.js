const farmerModel = require("../model/farmer.model");
const buildResponse = require("../util/buildRes");
class CustomerController {
  async getFarmerById(req, res) {
    try {
      const id = req.query.id;
      const farmer = await farmerModel.findOne({id: id});
      res.json(buildResponse(farmer, "Farmer detail", 200));
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
}

module.exports = new CustomerController();