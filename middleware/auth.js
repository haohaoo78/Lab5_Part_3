// middleware/auth.js

// Middleware kiểm tra user đã login hay chưa
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    // Đã login
    return next();
  }
  // Chưa login
  return res.status(401).json({ error: "Unauthorized - Vui lòng đăng nhập" });
}

// Middleware optional: nếu cần lấy thông tin user luôn
const attachUser = async (req, res, next) => {
  if (req.session && req.session.userId) {
    const User = require("../models/User");
    try {
      const user = await User.findById(req.session.userId).select("-password");
      if (user) req.user = user;
    } catch (err) {
      console.error(err);
    }
  }
  next();
};

module.exports = {
  isAuthenticated,
  attachUser,
};
