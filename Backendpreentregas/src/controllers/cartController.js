const cartManager = require('../models/cartManager');

exports.add = async (req, res) => {
  const newCart = await cartManager.add();
  res.status(201).json(newCart);
};

exports.getById = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getById(Number(cid));
  if (!cart) return res.status(404).send('Cart not found');
  res.json(cart);
};

exports.addProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const updatedCart = await cartManager.addProductToCart(Number(cid), Number(pid));
  if (!updatedCart) return res.status(404).send('Cart or product not found');
  res.json(updatedCart);
};

// Eliminar un producto específico de un carrito
exports.deleteProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const updatedCart = await cartManager.deleteProductFromCart(Number(cid), Number(pid));
  if (!updatedCart) return res.status(404).send('Cart or product not found');
  res.status(204).send(); // No content
};

// Actualizar todos los productos de un carrito con un arreglo de productos
exports.updateAllProducts = async (req, res) => {
  const { cid } = req.params;
  const products = req.body;
  const updatedCart = await cartManager.updateCartProducts(Number(cid), products);
  if (!updatedCart) return res.status(404).send('Cart not found');
  res.json(updatedCart);
};

// Actualizar la cantidad de un producto específico en el carrito
exports.updateProductQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const updatedCart = await cartManager.updateProductQuantity(Number(cid), Number(pid), quantity);
  if (!updatedCart) return res.status(404).send('Cart or product not found');
  res.json(updatedCart);
};

// Eliminar todos los productos del carrito
exports.deleteAllProducts = async (req, res) => {
  const { cid } = req.params;
  const updatedCart = await cartManager.clearCart(Number(cid));
  if (!updatedCart) return res.status(404).send('Cart not found');
  res.status(204).send(); // No content
};
