require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');

const app = express();

// ===== Routes =====
const indexRoutes = require('./routes/index');
const supplierRoutes = require('./routes/suppliers');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// ===== Session =====
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 giờ
  })
);

// ===== View engine =====
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ===== MongoDB =====
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/global_haven', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ===== Routes =====


app.use('/auth', authRoutes);
app.use('/', indexRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

// ===== Start server =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
