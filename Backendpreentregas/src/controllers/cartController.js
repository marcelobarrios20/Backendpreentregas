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
