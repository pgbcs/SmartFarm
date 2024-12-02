const homeRoutes = require("./home.route")
const customerRoutes = require("./customer.route");
const authRoutes = require("./auth.route");
const {verifyToken, authorizeRole} = require("../middleware/authenticateJWT");

module.exports = (app) => {
    app.use("/auth", authRoutes);
    app.use("/customer",verifyToken, authorizeRole(['customer']),customerRoutes);
    app.use("/",homeRoutes);
}
