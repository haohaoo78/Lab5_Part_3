// controllers/authController.js
const User = require("../models/User");

// ===== REGISTER =====
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username và password bắt buộc" });
    }

    // Kiểm tra username đã tồn tại
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username đã tồn tại" });
    }

    // Tạo user mới, password sẽ tự hash trong pre-save
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ error: "Đăng ký thất bại", details: err.message });
  }
};

// ===== LOGIN =====
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username và password bắt buộc" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Username hoặc password không đúng" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Username hoặc password không đúng" });
    }

    // Lưu session
    req.session.userId = user._id;

    // Set cookie custom
    res.cookie("sid", req.sessionID, {
      httpOnly: true,
      secure: false, // true nếu dùng HTTPS
      maxAge: 1000 * 60 * 60, // 1 giờ
    });

    res.json({ message: "Đăng nhập thành công!" });
  } catch (err) {
    res.status(500).json({ error: "Login thất bại", details: err.message });
  }
};

// ===== LOGOUT =====
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout thất bại" });

    res.clearCookie("sid");
    res.clearCookie("connect.sid");

    res.json({ message: "Đăng xuất thành công!" });
  });
};

// ===== PROFILE =====
exports.profile = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Chưa đăng nhập" });
    }

    const user = await User.findById(req.session.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Không lấy được thông tin user", details: err.message });
  }
};
