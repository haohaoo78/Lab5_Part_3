const User = require('../models/User');

// =================== REGISTER ===================
exports.register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const user = new User({ username, password, email, phone });
    await user.save();
    res.redirect("/auth/login"); // redirect tới trang login sau khi đăng ký
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// =================== LOGIN ===================
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send("Invalid password");

    // Lưu session
    req.session.username = user.username;
    req.session.userId = user._id;

    res.redirect("/"); // redirect về dashboard
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// =================== LOGOUT ===================
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
};
