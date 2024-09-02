const productManager = require('../models/productManager'); 
const io = require('../index').io; 

class ProductController {
    async getAll(req, res) {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;

            let products = await productManager.getAll();

            // Filtrar productos según query
            if (query) {
                products = products.filter(product => 
                    product.category.includes(query) || 
                    product.name.includes(query)
                );
            }

            // Ordenar productos según sort
            if (sort) {
                products = products.sort((a, b) => 
                    sort === 'asc' ? a.price - b.price : b.price - a.price
                );
            }

            // Paginación
            const totalPages = Math.ceil(products.length / limit);
            products = products.slice((page - 1) * limit, page * limit);

            // Respuesta con la estructura requerida
            res.status(200).json({
                status: "success",
                payload: products,
                totalPages,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: page < totalPages ? page + 1 : null,
                page: Number(page),
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
                prevLink: page > 1 ? `/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: page < totalPages ? `/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).send("Internal Server Error");
        }
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
