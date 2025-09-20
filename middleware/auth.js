// middleware/auth.js

// Middleware kiểm tra đăng nhập cho các route render (EJS)
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.username) {
    return next();
  }
  // Nếu chưa login, redirect tới trang login
  res.redirect("/auth/login");
}

// Middleware kiểm tra đăng nhập cho API trả JSON
function ensureAuthenticatedAPI(req, res, next) {
  if (req.session && req.session.username) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized. Please log in." });
}

module.exports = {
  ensureAuthenticated,
  ensureAuthenticatedAPI,
};
