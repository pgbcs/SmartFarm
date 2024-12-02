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
                username: username
            });
            if(!farmer){
                return res.json(buildResponse({}, "Username or password is incorrect", 400));
            }
            // const checkPassword = await bcrypt.compare(password, farmer.dataValues.Password);
            const checkPassword = password === farmer.Password;
            if(!checkPassword){
                return res.json(buildResponse({}, "Username or password is incorrect", 400));
            }
            const token = jwt.sign({id: farmer.id, role: 'farmer'}, process.env.JWT_SECRET);
            res.json(buildResponse({
                token: token,
                username: farmer.Username,
                name: farmer.Name,
                address: farmer.Address,
            }, "Login successfully", 200));
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
                username: username
            });

            if(!customer){
                return res.json(buildResponse({}, "Username or password is incorrect", 400));
            }
            // const checkPassword = await bcrypt.compare(password, customer.dataValues.Password);
            const checkPassword = password === customer.Password;
            if(!checkPassword){
                return res.json(buildResponse({}, "Username or password is incorrect", 400));
            }
            const token = jwt.sign({id: customer.id, role: 'customer'}, process.env.JWT_SECRET);
            res.json(buildResponse({
                token: token,
                username: customer.Username,
                name: customer.Name,
                address: customer.Address,
            }, "Login successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
    }
    }

    async farmerRegister(req, res){
        try{
            const {username, password, name, address, phone} = req.body;
            // const hashPassword = await bcrypt.hash(password, 10);
            if(!username|| !password|| !name || !address|| !phone){
                return res.json(buildResponse({}, "Please fill in all fields", 400));
            }

            const check = await customerModel.findOne({
                username: username
            });
            if(check){
                return res.json(buildResponse({}, "Username is already taken", 400));
            }

            const farmer = await farmerModel.create({
                Username: username,
                Password: password,
                Name: name,
                Adress: address,
                Phone_number: phone
            });
            res.json(buildResponse(farmer, "Register successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }

    async customerRegister(req, res){
        try{
            const {username, password, name, address, phone} = req.body;
            // const hashPassword = await bcrypt.hash(password, 10);
            if(!username|| !password|| !name || !address|| !phone){
                return res.json(buildResponse({}, "Please fill in all fields", 400));
            }
            const check = await customerModel.findOne({
                username: username
            });
            if(check){
                return res.json(buildResponse({}, "Username is already taken", 400));
            }
            
            const customer = await customerModel.create({
                Username: username,
                Password: password,
                Name: name,
                Address: address,
                Phone_number: phone
            });
            res.json(buildResponse(customer, "Register successfully", 200));
        }
        catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }
}
module.exports = new AuthController();