const ProductService = require("./productService");

class ProductController {
    async getAllProducts(req, res) {
        //const {limit, offset} = req.query;
        const posts = await ProductService.getAllProducts();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(posts));
    }

    async createProduct(req, res) {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', async () => {
            body = Buffer.concat(body).toString();
            console.log(body);
            const parsedBody = JSON.parse(`${body}`);
            const candidate = await ProductService.getOneProductByName(parsedBody.name);
            if (!candidate) {
                const post = await ProductService.createProduct(parsedBody);
                res.writeHead(201, {"Content-Type": "application/json"});
                res.end(JSON.stringify(post));
            } else {
                res.writeHead(400, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: 'Товар с таким названием уже существует'}));
            }
        })
    }

    async getOneProduct(req, res) {
        const id = req.url.split('/')[2];
        const post = await ProductService.getOneProductById(id);
        if (post) {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(post));
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: 'Продукта с таким id не существует'}));
        }
    }

    async updateProduct(req, res) {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', async () => {
            body = Buffer.concat(body).toString();
            console.log(body);
            const parsedBody = JSON.parse(`${body}`);
            const id = req.url.split('/')[3];
            const post = await ProductService.getOneProductById(id);
            if (post) {
                const updatedPost = await ProductService.updateProduct(id, parsedBody);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(updatedPost));
            } else {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: 'Продукта с таким id не существует'}));
            }
        })
    }

    async deleteProduct(req, res) {
        const id = req.url.split('/')[3];
        const post = await ProductService.getOneProductById(id);
        if (post) {
            const deletedPost = await ProductService.deleteProduct(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(deletedPost));
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: 'Продукта с таким id не существует'}));
        }
    }
}

module.exports = new ProductController();