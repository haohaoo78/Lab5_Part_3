const User = require('../models/User'); // model User của bạn

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra đã tồn tại username chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { title: 'Đăng ký', error: 'Username đã tồn tại', message: null });
    }

    // Tạo user mới
    await User.create({ username, password });

    res.render('register', { title: 'Đăng ký', error: null, message: 'Đăng ký thành công! Bạn có thể đăng nhập.' });
  } catch (err) {
    res.render('register', { title: 'Đăng ký', error: err.message, message: null });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.render('login', { title: 'Đăng nhập', error: 'Sai username hoặc password', message: null });
    }

    // Lưu session
    req.session.username = user.username;
    res.redirect('/');
  } catch (err) {
    res.render('login', { title: 'Đăng nhập', error: err.message, message: null });
  }
};
