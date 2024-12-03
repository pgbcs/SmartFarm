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
    
    async getAllProductBelongtoFarmer(options) {
        const { farmerID, offset, limit } = options;

        try {
            const [result] = await this.db.promise().query(
                `CALL get_farmer_products(?, ?, ?)`,
                [farmerID, limit, offset]
            );
        
            return [result[1][0]['COUNT(*)'], result[0]];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when fetching farmer products');
        }
    }

    async createProduct(options) {
        const { Start_date, Type,Breed , Price, Growth_time, gen_type } = options;
        try {
            const [result] = await this.db.promise().query(
                `CALL create_product(?, ?, ?, ?, ?, ?, ?)`,
                [name, price, quantity, description, farmerID, category, status]
            );
            return result[0];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when creating product');
        }
    }

    async updateProduct(options) {
        const { id, name, price, quantity, description, farmerID, category, status } = options;
        try {
            const [result] = await this.db.promise().query(
                `CALL update_product(?, ?, ?, ?, ?, ?, ?, ?)`,
                [id, name, price, quantity, description, farmerID, category, status]
            );
            return result[0];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when updating product');
        }
    }

    async deleteProduct(options) {
        const { id } = options;
        try {
            const [result] = await this.db.promise().query(
                `CALL delete_product(?)`,
                [id]
            );
            return result[0];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when deleting product');
        }
    }

    async createCrop(options) {
        const { Start_date, Type, Breed, Price, Growth_time, Area, Estimated_harvesting_cost, Soil_ID } = options;
        console.log(options);
        try {
            const [result] = await this.db.promise().query(
                `CALL insert_crop(?, ?, ?, ?, ?, ?,?,?)`,
                [Start_date, Type, Breed, Price, Growth_time, Area, Estimated_harvesting_cost, Soil_ID]
            );
            return result[0];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when creating crop');
        }
    }

    async createAqua(options) {
        const { Start_date, Type, Breed, Price, Growth_time, Pond_ID } = options;
        try {
            const [result] = await this.db.promise().query(
                `CALL insert_aqua(?, ?, ?, ?, ?, ?)`,
                [Start_date, Type, Breed, Price, Growth_time, Pond_ID]
            );
            return result[0];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when creating aqua');
        }
    }

    async createPoultry(options) {
        const { Start_date, Type, Breed, Price, Growth_time, Gender, Start_weight, shelter_ID,Egg } = options;
        try {
            const [result] = await this.db.promise().query(
                `CALL insert_animal_poultry(?, ?, ?, ?, ?, ?,?,?,?)`,
                [Start_date, Type, Breed, Price, Growth_time, Gender, Start_weight, shelter_ID, Egg]
            );
            return result[0];
        } catch (err) {
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when creating poultry');
        }
    }

    async createLiveStock(options) {
        const { Start_date, Type, Breed, Price, Growth_time, Gender, Start_weight, shelter_ID }= options;
        try {
            const [result] = await this.db.promise().query(
                `CALL insert_animal_livestock(?, ?, ?, ?, ?, ?, ?, ?)`,
                [Start_date, Type, Breed, Price, Growth_time, Gender, Start_weight, shelter_ID]);
            return result[0];
        }catch(err){
            console.error("Lỗi khi gọi thủ tục:", err);
            throw new Error('Error when creating livestock');
        }  
    }
}

module.exports = new ProductModel();
