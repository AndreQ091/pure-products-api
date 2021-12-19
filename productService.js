const Product = require('./productModel');

class ProductService {

    async getAllProducts(limit, offset) {
        return await Product.findAll({limit, offset});
    }

    async getOneProductById(id) {
        return await Product.findOne({where: {id}});
    }

    async getOneProductByName(name) {
        return await Product.findOne({where: {name}});
    }

    async createProduct(createDto) {
        const product = await Product.create(createDto);
        return product.save();
    }

    async updateProduct(id, updateDto) {
        return await Product.update({...updateDto}, {where: {id}});
    }

    async deleteProduct(id) {
        return await Product.destroy({where: {id}});
    }
}

module.exports = new ProductService();