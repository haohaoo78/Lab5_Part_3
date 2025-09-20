const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Trang chủ: danh sách sản phẩm + tìm kiếm + lọc nhà cung cấp
router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';
    const selectedSupplier = req.query.supplier || '';

    // Lấy tất cả nhà cung cấp
    const suppliers = await Supplier.find();

    // Xây dựng query lọc sản phẩm
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // tìm kiếm không phân biệt hoa thường
    }
    if (selectedSupplier) {
      query.supplier = selectedSupplier;
    }

    // Lấy danh sách sản phẩm theo query
    const products = await Product.find(query).populate('supplier');

    res.render('index', {
      title: 'Trang chủ',
      products,
      suppliers,
      selectedSupplier,
      search,
      user: req.session.user || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi server');
  }
});

module.exports = router;
