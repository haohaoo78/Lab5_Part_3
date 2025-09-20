const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// List suppliers
router.get('/', async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('suppliers/index', { title: 'Danh sách Nhà Cung Cấp', suppliers });
});

// New supplier form
router.get('/new', (req, res) => {
  res.render('suppliers/form', { title: 'Thêm Nhà Cung Cấp', supplier: null });
});

// Edit supplier form (đặt sau /new để không bị nhầm)
router.get('/:id/edit', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).send('Supplier not found');
    res.render('suppliers/form', { title: 'Sửa Nhà Cung Cấp', supplier });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create supplier
router.post('/', async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    await Supplier.create({ name, address, phone });
    res.redirect('/suppliers');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update supplier
router.put('/:id', async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
    res.redirect('/suppliers');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete supplier
router.delete('/:id', async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
