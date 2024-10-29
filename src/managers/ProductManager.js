const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(data);
    } else {
      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }

  getAllProducts(limit = null) {
    return limit ? this.products.slice(0, limit) : this.products;
  }

  getProductById(id) {
    return this.products.find((p) => p.id === id);
  }

  addProduct({
    title,
    description,
    price,
    code,
    stock,
    category,
    thumbnails = [],
    status = true,
  }) {
    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      code,
      stock,
      category,
      thumbnails,
      status,
    };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return null;

    this.products[index] = { ...this.products[index], ...updatedFields };
    this.saveProducts();
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) return null;

    const deletedProduct = this.products.splice(index, 1);
    this.saveProducts();
    return deletedProduct;
  }
}

module.exports = ProductManager;
