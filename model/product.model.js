const BaseModel = require('./base.model');

class ProductModel extends BaseModel {
    constructor() {
        super('PRODUCT');
    }

    // Sử dụng async/await với Promise
    async findProductNotSold(options) {
        const { offset, limit } = options;

        try {
            // Sử dụng promise() để hỗ trợ async/await
            const [result] = await this.db.promise().query(
                `CALL get_unsold_products(?, ?)`,
                [limit, offset]
            );
            // Trả về kết quả sau khi gọi thủ tục
            return [result[1][0]['COUNT(*)'], result[0]];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when fetching unsold products');
        }
    }

}

module.exports = new ProductModel();
