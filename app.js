require('dotenv').config();
const http = require('http');
const url = require('url');
const {parse} = require('querystring');

const ProductService = require('./productService');


const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {

    const urlparse = url.parse(req.url, true);

    if (urlparse.pathname === '/products' && req.method === 'GET') {
        try {
            //const {limit, offset} = req.query;
            const posts = await ProductService.getAllProducts();
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(posts));
        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message}));
        }
    }
    else if (urlparse.pathname === '/products/create' && req.method === 'POST') {
        try {
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
                }
                res.writeHead(400, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: 'Товар с таким названием уже существует'}));
            })
        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message}));
        }
    }
    else if (urlparse.pathname.match(/\/products\/([a-z A-Z 0-9]+)/) && req.method === 'GET') {
        try {
            const id = req.url.split('/')[2];
            const post = await ProductService.getOneProductById(id);
            if (post) {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(post));
            }
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: 'Продукта с таким id не существует'}));
        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message}));
        }
    }
    else if (urlparse.pathname.match(/\/products\/update\/([a-z A-Z 0-9]+)/) && req.method === 'PATCH') {
        try {
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
                    res.writeHead(404, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(updatedPost));
                }
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: 'Продукта с таким id не существует'}));
            })
        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message}));
        }
    }
    else if (urlparse.pathname.match(/\/products\/delete\/([a-z A-Z 0-9]+)/) && req.method === 'DELETE') {
        try {
            const id = req.url.split('/')[3];
            console.log(id);
            const post = await ProductService.getOneProductById(id);
            if (post) {
                const deletedPost = await ProductService.deleteProduct(id);
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify(deletedPost));
            }
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: 'Продукта с таким id не существует'}));
        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message}));
        }
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});