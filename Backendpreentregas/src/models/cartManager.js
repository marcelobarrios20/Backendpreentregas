const path = require('path');
const { readFile, writeFile } = require('../utils/fsUtils');

class CartManager {
  constructor() {
    this.path = path.join(__dirname, '../../carts.json');
  }

  async getAll() {
    const carts = await readFile(this.path);
    return carts || [];
  }

  async getById(id) {
    const carts = await this.getAll();
    return carts.find(c => c.id === id);
  }

  async add() {
    const carts = await this.getAll();
    const id = carts.length ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id, products: [] };
    carts.push(newCart);
    await writeFile(this.path, carts);
    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getAll();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(p => p.product === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await writeFile(this.path, carts);
    return cart;
  }
}

module.exports = new CartManager();
