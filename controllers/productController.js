const Product = require("../models/Product");

// Lấy danh sách sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("supplier"); // populate để lấy thông tin supplier
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy 1 sản phẩm theo id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("supplier");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm mới sản phẩm
exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplier } = req.body;
    const product = new Product({ name, price, quantity, supplier });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplier } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity, supplier },
      { new: true, runValidators: true }
    ).populate("supplier");

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
