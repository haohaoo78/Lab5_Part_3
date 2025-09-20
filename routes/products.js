const express = require("express");
const router = express.Router();
const renderController = require("../controllers/renderController");

// Middleware kiểm tra đăng nhập
function isAuthenticated(req, res, next) {
  if (req.session.username) return next();
  res.redirect("/auth/login");
}

// =================== RENDER ===================
router.get("/", isAuthenticated, renderController.renderProducts);
router.get("/new", isAuthenticated, renderController.renderNewProduct);
router.get("/edit/:id", isAuthenticated, renderController.renderEditProduct);

// =================== CRUD ===================
router.post("/", isAuthenticated, renderController.createProduct);
router.post("/update/:id", isAuthenticated, renderController.updateProduct);
router.post("/delete/:id", isAuthenticated, renderController.deleteProduct);

module.exports = router;
