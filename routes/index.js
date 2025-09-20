const express = require("express");
const router = express.Router();
const renderController = require("../controllers/renderController");

// Middleware kiểm tra đăng nhập
function isAuthenticated(req, res, next) {
  if (req.session.username) return next();
  res.redirect("/auth/login");
}

// =================== DASHBOARD ===================
router.get("/", isAuthenticated, renderController.renderDashboard);

module.exports = router;
