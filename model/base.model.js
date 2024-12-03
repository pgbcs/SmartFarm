const db = require('../config/db');  // Kết nối đến cơ sở dữ liệu MySQL2

class BaseModel {
  constructor(tableName) {
    this.db = db;
    this.tableName = tableName;  // Tên bảng mà model này quản lý
  }

  // Tạo mới bản ghi
  async create(data) {
    const fields = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');

    const query = `INSERT INTO ${this.tableName} (${fields}) VALUES (${placeholders})`;

    try {
      const [result] = await this.db.promise().execute(query, values);
      return result; // Trả về kết quả của câu lệnh insert
    } catch (err) {
      throw new Error('Error creating record: ' + err.message);
    }
  }

  // Lấy tất cả bản ghi
  async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    try {
      const [rows] = await this.db.promise().execute(query);
      return rows; // Trả về danh sách bản ghi
    } catch (err) {
      throw new Error('Error fetching all records: ' + err.message);
    }
  }

  //Lấy bản ghi theo điều kiện dùng mysql2
  async findOne(options) {
    const keys = Object.keys(options);
    const values = Object.values(options);
    const conditions = keys.map(key => `${key} = ?`).join(' AND ');

    const query = `SELECT * FROM ${this.tableName} WHERE ${conditions};`;

    try {
        const [rows] = await this.db.promise().execute(query, values);
        return rows[0]; // Trả về bản ghi đầu tiên
  
    } catch (err) {
        throw new Error('Error fetching record: ' + err.message);
    }
}
  // Cập nhật bản ghi
  async update(id, data) {
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);
    // console.log(this.tableName);
    const query = `UPDATE ${this.tableName} SET ${setClause} WHERE ID = ?`;
    console.log(query);
    try {
      const [result] = await this.db.promise().execute(query, [...values, id]);
      
      return result;  // Trả về kết quả của câu lệnh update
    } catch (err) {
      throw new Error('Error updating record: ' + err.message);
    }
  }

  // Xóa bản ghi
  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE ID = ?`;
    // console.log(query); 
    try {
      const [result] = await this.db.promise().execute(query, [id]);
      return result;  // Trả về kết quả của câu lệnh delete
    } catch (err) {
      throw new Error('Error deleting record: ' + err.message);
    }
  }

  // Lấy các bản ghi với phân trang
  async findAllWithPagination(limit, offset) {
    const query = `SELECT * FROM ${this.tableName} LIMIT ? OFFSET ?`;

    try {
      const [rows] = await this.db.promise().execute(query, [limit, offset]);
      return rows;  // Trả về các bản ghi theo phân trang
    } catch (err) {
      throw new Error('Error fetching records with pagination: ' + err.message);
    }
  }

  // Đếm số lượng bản ghi
  async count() {
    const query = `SELECT COUNT(*) AS total FROM ${this.tableName}`;

    try {
      const [rows] = await this.db.promise().execute(query);
      return rows[0].total; // Trả về tổng số bản ghi
    } catch (err) {
      throw new Error('Error counting records: ' + err.message);
    }
  }
}

module.exports = BaseModel;
