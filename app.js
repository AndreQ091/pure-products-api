require('dotenv').config();
const http = require('http');
const url = require('url');

const ProductController = require('./productController');


const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {

    const urlparse = url.parse(req.url, true);

    if (urlparse.pathname === '/products' && req.method === 'GET') {
        try {
            await ProductController.getAllProducts(req, res);
        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message}));
        }
    }

    else if (urlparse.pathname === '/products/create' && req.method === 'POST') {
        try {
            await ProductController.createProduct(req, res);
        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message}));
        }
    }

    else if (urlparse.pathname.match(/\/products\/([a-z A-Z 0-9]+)/) && req.method === 'GET') {
        try {
            await ProductController.getOneProduct(req, res);
        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message}));
        }
    }

    else if (urlparse.pathname.match(/\/products\/update\/([a-z A-Z 0-9]+)/) && req.method === 'PATCH') {
        try {
            await ProductController.updateProduct(req, res);
        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message}));
        }
    }

    else if (urlparse.pathname.match(/\/products\/delete\/([a-z A-Z 0-9]+)/) && req.method === 'DELETE') {
        try {
            await ProductController.deleteProduct(req, res);
        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message}));
        }
    }

    else if (urlparse.pathname.match(/\/products\/upload\/([a-z A-Z 0-9]+)/) && req.method === 'POST') {
        try {
            await ProductController.uploadProductImage(req, res);
        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message}));
        }
    }

    else {
        res.writeHead(404, {"Content-Type": "application/json"});
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});