const express = require("express");
const router = express.Router();
const renderController = require("../controllers/renderController");

// Middleware kiểm tra đăng nhập
function isAuthenticated(req, res, next) {
  if (req.session.username) return next();
  res.redirect("/auth/login");
}

// =================== RENDER ===================
router.get("/", isAuthenticated, renderController.renderSuppliers);
router.get("/new", isAuthenticated, renderController.renderNewSupplier);
router.get("/edit/:id", isAuthenticated, renderController.renderEditSupplier);

// =================== CRUD ===================
router.post("/", isAuthenticated, renderController.createSupplier);
router.post("/update/:id", isAuthenticated, renderController.updateSupplier);
router.post("/delete/:id", isAuthenticated, renderController.deleteSupplier);

module.exports = router;
