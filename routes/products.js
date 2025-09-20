const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// List products
router.get('/', async (req, res) => {
  const products = await Product.find().populate('supplier');
  res.render('products/index', { title: 'Danh sách Sản Phẩm', products });
});

// New product form
router.get('/new', async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/form', { title: 'Thêm Sản Phẩm Mới', product: null, suppliers });
});

// Edit product form (đặt sau /new)
router.get('/:id/edit', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier');
    const suppliers = await Supplier.find();
    if (!product) return res.status(404).send('Product not found');
    res.render('products/form', { title: 'Sửa Sản Phẩm', product, suppliers });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create product
router.post('/', async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  try {
    await Product.create({ name, price, quantity, supplier });
    res.redirect('/products');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update product
router.put('/:id', async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  try {
    await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
    res.redirect('/products');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
