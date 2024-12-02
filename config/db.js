require('dotenv').config();

// const { Sequelize } = require('sequelize');
// console.log(process.env.DATABASE_URL);
// // Tạo kết nối với MySQL
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   define:{
//     freezeTableName: true,
//     timestamps: false,
//   },
//   dialect: 'mysql',
//   dialectModule: require('mysql2'),
//   logging: false  // Tắt log SQL nếu không cần
// });

// // Kiểm tra kết nối 
// sequelize.authenticate()
//   .then(() => console.log('Connection has been established successfully.'))
//   .catch(err => console.error('Unable to connect to the database:', err));

// module.exports = sequelize;


const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

//kiểm tra kết nối
connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;