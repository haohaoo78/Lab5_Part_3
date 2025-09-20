// routes/index.js
const express = require("express");
const router = express.Router();

// Import các route khác
const authRoutes = require("./auth");
const productRoutes = require("./products");
const supplierRoutes = require("./suppliers");

// Trang home
router.get("/", (req, res) => {
  res.render("index", { title: "Trang chủ" });
});

// Các route chức năng
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/suppliers", supplierRoutes);

// 404 - Not Found
router.use((req, res) => {
  res.status(404).render("404", { title: "Không tìm thấy trang" });
});

module.exports = router;
