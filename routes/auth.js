const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Model User
const crypto = require('crypto'); // nếu muốn tạo token reset
// const nodemailer = require('nodemailer'); // nếu muốn gửi email

// Middleware kiểm tra đăng nhập
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) return next();
  res.redirect('/auth/login');
}

// ===== DASHBOARD =====
router.get('/', isAuthenticated, (req, res) => {
  res.render('index', {
    title: 'Dashboard',
    user: req.session.user
  });
});

// ===== REGISTER =====
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

router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
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

// ===== LOGIN =====
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Đăng nhập',
    error: null,
    message: null
  });
});

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

// ===== LOGOUT =====
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect('/auth/login');
  });
});

// ===== FORGOT PASSWORD =====
router.get('/forgot', (req, res) => {
  res.render('forgot', {
    title: 'Quên mật khẩu',
    error: null,
    message: null
  });
});

router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('forgot', {
        title: 'Quên mật khẩu',
        error: 'Email không tồn tại',
        message: null
      });
    }

    // TODO: tạo token reset và gửi email
    // const token = crypto.randomBytes(20).toString('hex');

    res.render('forgot', {
      title: 'Quên mật khẩu',
      error: null,
      message: 'Liên kết đặt lại mật khẩu đã được gửi tới email của bạn.'
    });
  } catch (err) {
    res.render('forgot', {
      title: 'Quên mật khẩu',
      error: err.message,
      message: null
    });
  }
});

module.exports = router;
