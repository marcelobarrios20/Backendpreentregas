const productManager = require('../models/productManager'); // Asegúrate de tener esta importación
const io = require('../index').io; 

class ProductController {
    async getAll(req, res) {
        const products = await productManager.getAll();
        res.json(products);
    }

    async getById(req, res) {
        const productId = req.params.pid;
        const product = await productManager.getById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    }

    async add(req, res) {
        const product = await productManager.add(req.body);
        io.emit('product-added', product); // Emitir evento
        res.json(product);
    }

    async update(req, res) {
        const productId = req.params.pid;
        const updatedProduct = await productManager.update(productId, req.body);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    }

    async delete(req, res) {
        const productId = req.params.pid;
        await productManager.delete(productId);
        io.emit('product-deleted', productId); // Emitir evento
        res.status(204).send();
    }
}

module.exports = new ProductController();
