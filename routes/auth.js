const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware kiểm tra đăng nhập
function isAuthenticated(req, res, next) {
  if (req.session && req.session.username) return next();
  res.redirect('/auth/login');
}

// Dashboard
router.get('/', isAuthenticated, (req, res) => {
  res.render('index', {
    title: 'Dashboard',
    user: { username: req.session.username }
  });
});

// GET register
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Đăng ký',
    user: req.session.username ? { username: req.session.username } : null,
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

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render('register', {
        title: 'Đăng ký',
        user: null,
        error: 'Username hoặc Email đã tồn tại',
        message: null,
        username,
        email,
        phone
      });
    }

    await User.create({ username, email, phone, password });

    res.render('register', {
      title: 'Đăng ký',
      user: null,
      error: null,
      message: 'Đăng ký thành công! Bạn có thể đăng nhập.',
      username: '',
      email: '',
      phone: ''
    });
  } catch (err) {
    res.render('register', {
      title: 'Đăng ký',
      user: null,
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
    user: req.session.username ? { username: req.session.username } : null,
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
      return res.render('login', { title: 'Đăng nhập', user: null, error: 'Sai username hoặc mật khẩu', message: null });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { title: 'Đăng nhập', user: null, error: 'Sai username hoặc mật khẩu', message: null });
    }

    req.session.username = user.username;
    res.redirect('/');
  } catch (err) {
    res.render('login', { title: 'Đăng nhập', user: null, error: err.message, message: null });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;
