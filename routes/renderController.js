const Supplier = require("../models/Supplier");
const Product = require("../models/Product");

// =================== DASHBOARD ===================
exports.renderDashboard = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    const products = await Product.find().populate("supplier");
    res.render("index", { suppliers, products, title: "Dashboard" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// =================== SUPPLIER ===================
// Render
exports.renderSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("suppliers/index", { suppliers, title: "Danh sách Nhà Cung Cấp" });
};
exports.renderNewSupplier = (req, res) => {
  res.render("suppliers/new", { title: "Thêm Nhà Cung Cấp" });
};
exports.renderEditSupplier = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) return res.status(404).send("Supplier not found");
  res.render("suppliers/edit", { supplier, title: "Sửa Nhà Cung Cấp" });
};

// CRUD
exports.createSupplier = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.create({ name, address, phone });
  res.redirect("/suppliers");
};
exports.updateSupplier = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
  res.redirect("/suppliers");
};
exports.deleteSupplier = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect("/suppliers");
};

// =================== PRODUCT ===================
// Render
exports.renderProducts = async (req, res) => {
  const products = await Product.find().populate("supplier");
  res.render("products/index", { products, title: "Danh sách Sản Phẩm" });
};
exports.renderNewProduct = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("products/new", { suppliers, title: "Thêm Sản Phẩm Mới" });
};
exports.renderEditProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("supplier");
  const suppliers = await Supplier.find();
  if (!product) return res.status(404).send("Product not found");
  res.render("products/edit", { product, suppliers, title: "Sửa Sản Phẩm" });
};

// CRUD
exports.createProduct = async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  await Product.create({ name, price, quantity, supplier });
  res.redirect("/products");
};
exports.updateProduct = async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
  res.redirect("/products");
};
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
};
