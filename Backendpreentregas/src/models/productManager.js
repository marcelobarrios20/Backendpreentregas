const path = require('path');
const { readFile, writeFile } = require('../utils/fsUtils');

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, '../../products.json');
  }

  async getAll() {
    const products = await readFile(this.path);
    return products || [];
  }

  async getById(id) {
    const products = await this.getAll();
    return products.find(p => p.id === id);
  }

  async add(product) {
    const products = await this.getAll();
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id, ...product };
    products.push(newProduct);
    await writeFile(this.path, products);
    return newProduct;
  }

  async update(id, updatedProduct) {
    let products = await this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updatedProduct };
    await writeFile(this.path, products);
    return products[index];
  }

  async delete(id) {
    let products = await this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    const deletedProduct = products.splice(index, 1);
    await writeFile(this.path, products);
    return deletedProduct;
  }
}

module.exports = new ProductManager();
