const fs = require('fs');
const Product = require('./productModel');

class ProductService {
    async uploadImage(img) {
        await img.mv('./public/images/' + img.name);
        //http://localhost:5000/images/[img.name]
    }

    deleteImage(img) {
        const imagePath = './public/images/' + img;
        fs.unlinkSync(imagePath);
    }

    async getAllProducts(limit, offset) {
        return await Product.findAll({ limit, offset });
    }

    async getOneProductById(id) {
        return await Product.findOne({ where: { id } });
    }

    async getOneProductByName(name) {
        return await Product.findOne({ where: { name } });
    }

    async createProduct(createDto) {
            const product = await Product.create(createDto);
            return product.save();
    }

    async updateProduct(id, updateDto) {
        return await Product.update({ ...updateDto }, { where: { id } });
    }

    async deleteProduct(id) {
        return await Product.destroy({ where: { id } });
    }
}

module.exports = new ProductService();