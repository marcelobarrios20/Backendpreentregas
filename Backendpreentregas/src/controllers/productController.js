const productManager = require('../models/productManager');

exports.getAll = async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getById(Number(pid));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.add = async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await productManager.add(newProduct);
    res.status(201).json(addedProduct);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.update = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await productManager.update(Number(pid), req.body);
    if (!updatedProduct) return res.status(404).send('Product not found');
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.delete = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.delete(Number(pid));
    if (!deletedProduct) return res.status(404).send('Product not found');
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
