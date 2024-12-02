const homeRoutes = require("./home.route")
const customerRoutes = require("./customer.route");
const authRoutes = require("./auth.route");
const farmerRoutes = require("./farmer.route");
const {verifyToken, authorizeRole} = require("../middleware/authenticateJWT");

module.exports = (app) => {
    app.use("/auth", authRoutes);
    app.use("/customer",verifyToken, authorizeRole(['customer']),customerRoutes);
    app.use("/farmer",verifyToken, authorizeRole(['farmer']),farmerRoutes);
    app.use("/",homeRoutes);
}
