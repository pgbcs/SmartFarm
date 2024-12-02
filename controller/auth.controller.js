const buildResponse = require('../util/buildRes.js');
const farmerModel = require('../model/farmer.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const customerModel = require('../model/customer.model.js');

class AuthController{
    async famerLogin(req, res){
        try{
            const {username, password} = req.body;
            const farmer = await farmerModel.findOne({
                where: {
                    username: username
                }
            });
            if(!farmer){
                return res.json(buildResponse({}, "Username or password is incorrect", 400));
            }
            // const checkPassword = await bcrypt.compare(password, farmer.dataValues.Password);
            const checkPassword = password === farmer.dataValues.Password;
            if(!checkPassword){
                return res.json(buildResponse({}, "Username or password is incorrect", 400));
            }
            const token = jwt.sign({id: farmer.id, role: 'farmer'}, process.env.JWT_SECRET);
            res.json(buildResponse({token: token}, "Login successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }

    async customerLogin(req, res){
        try{
            const {username, password} = req.body;

            const customer = await customerModel.findOne({
                where: {
                    username: username
                }
            });

            if(!customer){
                return res.json(buildResponse({}, "Username or password is incorrect", 400));
            }
            // const checkPassword = await bcrypt.compare(password, customer.dataValues.Password);
            const checkPassword = password === customer.dataValues.Password;
            if(!checkPassword){
                return res.json(buildResponse({}, "Username or password is incorrect", 400));
            }
            const token = jwt.sign({id: customer.id, role: 'customer'}, process.env.JWT_SECRET);
            res.json(buildResponse({token: token}, "Login successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
    }
}
}
module.exports = new AuthController();