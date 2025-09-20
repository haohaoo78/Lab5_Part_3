const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// =================== REGISTER ===================
router.get("/register", (req, res) => {
  res.render("auth/register", { title: "Đăng ký" });
});
router.post("/register", authController.register);

// =================== LOGIN ===================
router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Đăng nhập" });
});
router.post("/login", authController.login);

// =================== LOGOUT ===================
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

module.exports = router;
