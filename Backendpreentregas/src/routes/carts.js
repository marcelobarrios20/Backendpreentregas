const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Agregar las siguientes rutas:

// Eliminar un producto específico de un carrito
router.delete("/:cid/products/:pid", cartController.deleteProduct);

// Actualizar todos los productos de un carrito con un arreglo de productos
router.put("/:cid/products", cartController.updateAllProducts);

// Actualizar la cantidad de un producto específico en el carrito
router.put("/:cid/products/:pid", cartController.updateProductQuantity);

// Eliminar todos los productos del carrito
router.delete("/:cid", cartController.deleteAllProducts);

module.exports = router;
