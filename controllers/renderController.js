const Supplier = require("../models/Supplier");
const Product = require("../models/Product");

// =================== DASHBOARD ===================
exports.renderDashboard = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    const products = await Product.find().populate("supplier");
    res.render("index", {
      suppliers,
      products,
      title: "Dashboard",
      user: req.session.username,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// =================== SUPPLIER ===================
// Render
exports.renderSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render("suppliers/index", {
      suppliers,
      title: "Danh sách Nhà Cung Cấp",
      user: req.session.username,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.renderNewSupplier = (req, res) => {
  res.render("suppliers/new", { title: "Thêm Nhà Cung Cấp", user: req.session.username });
};

exports.renderEditSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).send("Supplier not found");
    res.render("suppliers/edit", {
      supplier,
      title: "Sửa Nhà Cung Cấp",
      user: req.session.username,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// CRUD
exports.createSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    await Supplier.create({ name, address, phone });
    res.redirect("/suppliers");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
    res.redirect("/suppliers");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// =================== PRODUCT ===================
// Render
exports.renderProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("supplier");
    res.render("products/index", {
      products,
      title: "Danh sách Sản Phẩm",
      user: req.session.username,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.renderNewProduct = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render("products/new", {
      suppliers,
      title: "Thêm Sản Phẩm Mới",
      user: req.session.username,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.renderEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("supplier");
    const suppliers = await Supplier.find();
    if (!product) return res.status(404).send("Product not found");
    res.render("products/edit", {
      product,
      suppliers,
      title: "Sửa Sản Phẩm",
      user: req.session.username,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// CRUD
exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplier } = req.body;
    await Product.create({ name, price, quantity, supplier });
    res.redirect("/products");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplier } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
    res.redirect("/products");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
