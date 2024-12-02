require('dotenv').config();
const { Sequelize } = require('sequelize');
console.log(process.env.DATABASE_URL);
// Tạo kết nối với MySQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define:{
    freezeTableName: true,
    timestamps: false,
  },
  dialect: 'mysql',
  logging: false  // Tắt log SQL nếu không cần
});

// Kiểm tra kết nối 
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
