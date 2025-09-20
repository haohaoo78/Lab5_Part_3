const express = require("express");
const router = express.Router();
const ctrl = require("./renderController");

// ===== DASHBOARD =====
router.get("/", ctrl.renderDashboard);

// ===== SUPPLIER =====
// Render
router.get("/suppliers", ctrl.renderSuppliers);
router.get("/suppliers/new", ctrl.renderNewSupplier);
router.get("/suppliers/:id/edit", ctrl.renderEditSupplier);
// CRUD
router.post("/suppliers", ctrl.createSupplier);
router.put("/suppliers/:id", ctrl.updateSupplier);
router.delete("/suppliers/:id", ctrl.deleteSupplier);

// ===== PRODUCT =====
// Render
router.get("/products", ctrl.renderProducts);
router.get("/products/new", ctrl.renderNewProduct);
router.get("/products/:id/edit", ctrl.renderEditProduct);
// CRUD
router.post("/products", ctrl.createProduct);
router.put("/products/:id", ctrl.updateProduct);
router.delete("/products/:id", ctrl.deleteProduct);

module.exports = router;
