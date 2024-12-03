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

    async getAllProductBelongtoCustomer(options) {
        const { customerID, offset, limit, inorder } = options;

        try {
            // Sử dụng promise() để hỗ trợ async/await
            const [result] = await this.db.promise().query(
                `CALL get_customer_products(?, ?, ?, ?)`,
                [customerID, inorder, limit, offset]
            );
            // Trả về kết quả sau khi gọi thủ tục
            return [result[1][0]['COUNT(*)'], result[0]];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when fetching customer products');}
    }   

    async getDetailProduct(options) {
        const { productID } = options;

        try {
            // Sử dụng promise() để hỗ trợ async/await
            const [result] = await this.db.promise().query(
                `CALL get_detail_product(?)`,
                [productID]
            );
            // Trả về kết quả sau khi gọi thủ tục
            return result[0];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when fetching product detail');
        }
    }

    async getFarmer(options) {
        const {productID} = options;
        try {
            // Sử dụng promise() để hỗ trợ async/await
            const [result] = await this.db.promise().query(
                `CALL Get_Farmer_From_product(?)`,
                [productID]
            );
            // Trả về kết quả sau khi gọi thủ tục
            return result[0];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when fetching farmer');
        }
    }

    async addProductToOrder(options) {
        const {id, Order_ID, status} = options;
        try {
            // Sử dụng promise() để hỗ trợ async/await
            const [result] = await this.db.promise().query(
                `UPDATE PRODUCT SET Order_ID = ?, Status = ? WHERE ID = ?`,
                [Order_ID, status, id],
            );
            // Trả về kết quả sau khi gọi thủ tục
            return result[0];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when adding product to order');
    }}

    async getDetailAquaProduct(options) {
        try {
            const {id} = options;
            const [result] = await this.db.promise().query(
                `SELECT * FROM aquaculture_product_encapsulation WHERE Prod_ID = ?`,
                [id]
            );
            return result[0];
        }
        catch(err){
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when fetching aqua product detail');
        }
    }

    async getDetailCropProduct(options) {
        try{
            const {id} = options;
            const [result] = await this.db.promise().query(
                `SELECT * FROM crop_product_encapsulation WHERE Prod_ID = ?`,
                [id]
            );
            return result[0];
        }
        catch(err){
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when fetching crop product detail');
        }
    }

    async getDetailAnimalProduct(options) {
        try{
            const {id} = options;
            const [result] = await this.db.promise().query(
                `SELECT * FROM husbandry_product_encapsulation WHERE Prod_ID = ?`,
                [id]
            );
            return result[0];
        }
        catch(err){
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when fetching animal product detail');   
    }
}
}

module.exports = new ProductModel();
