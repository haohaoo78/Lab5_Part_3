const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Model User

// Middleware kiểm tra đăng nhập
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) return next();
  res.redirect('/auth/login');
}

// Dashboard (chỉ truy cập khi đã login)
router.get('/', isAuthenticated, (req, res) => {
  res.render('index', {
    title: 'Dashboard',
    user: req.session.user
  });
});

// GET register
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Đăng ký',
    error: null,
    message: null,
    username: '',
    email: '',
    phone: ''
  });
});

// POST register
router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Kiểm tra trùng username hoặc email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render('register', {
        title: 'Đăng ký',
        error: 'Username hoặc Email đã tồn tại',
        message: null,
        username,
        email,
        phone
      });
    }

    // Lưu user mới (password sẽ tự hash theo schema pre-save)
    await User.create({ username, email, phone, password });

    res.render('register', {
      title: 'Đăng ký',
      error: null,
      message: 'Đăng ký thành công! Bạn có thể đăng nhập.',
      username: '',
      email: '',
      phone: ''
    });
  } catch (err) {
    res.render('register', {
      title: 'Đăng ký',
      error: err.message,
      message: null,
      username: req.body.username || '',
      email: req.body.email || '',
      phone: req.body.phone || ''
    });
  }
});

// GET login
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Đăng nhập',
    error: null,
    message: null
  });
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.render('login', {
        title: 'Đăng nhập',
        error: 'Sai username hoặc mật khẩu',
        message: null
      });
    }

    // So sánh password hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', {
        title: 'Đăng nhập',
        error: 'Sai username hoặc mật khẩu',
        message: null
      });
    }

    // Lưu session
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone
    };

    res.redirect('/');
  } catch (err) {
    res.render('login', {
      title: 'Đăng nhập',
      error: err.message,
      message: null
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect('/auth/login');
  });
});

module.exports = router;
