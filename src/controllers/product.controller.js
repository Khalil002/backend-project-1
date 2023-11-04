const Product = require('../models/product.model');

async function createProduct(req, res) {
  const { name, description, price, category, restaurant } = req.body;
  try {
    console.log('testing');
    const newProduct = new Product({ name, description, price, category, restaurant });
    await newProduct.save();
    res.status(201).json(newProduct);
    console.log('Product created');
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log('Error while running createProduct(req, res)');
  }
}

async function getProducts(req, res) {
  const { category, restaurant } = req.query;
  const query = { deletedAt: null };
  if (category) query.category = category;
  if (restaurant) query.restaurant = restaurant;
  try {
    const products = await Product.find(query);
    if (products.length === 0) {
      res.status(404).json({ error: 'products not found' });
      console.log('No products found');
    } else {
      res.status(200).json(products);
      console.log('Products found');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log('Error while running getProducts(req, res)');
  }
}

async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product.length === 0 || product.deletedAt !== null) {
      res.status(404).json({ error: 'Product not found' });
      console.log('Product not found (id)');
    } else {
      res.status(200).json(product);
      console.log('Product found');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log('Error while running getProductById(req, res)');
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, category, deletedAt } = req.body;
  const update = { name, price, category, deletedAt, updatedAt: Date.now() };
  try {
    const product = await Product.findOneAndUpdate({ _id: id, deletedAt: null }, update, {
      new: true,
    });
    if (product === null || product.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      console.log('Product not found (update)');
    } else {
      res.status(200).json(product);
      console.log('Product updated');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log('Error while running updateProduct(req, res)');
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const update = { deletedAt: Date.now(), updatedAt: Date.now() };
  try {
    const product = await Product.findOneAndUpdate({ _id: id, deletedAt: null }, update, {
      new: true,
    });
    if (product === null || product.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      console.log('Product not found (delete)');
    } else {
      res.status(200).json(product);
      console.log('Product deleted');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log('Error while running deleteProduct(req, res)');
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
