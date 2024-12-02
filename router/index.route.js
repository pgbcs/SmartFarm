const homeRoutes = require("./home.route")
const customerRoutes = require("./customer.route");

module.exports = (app) => {
    app.use("/customer",customerRoutes);
    app.use("/",homeRoutes)
}
