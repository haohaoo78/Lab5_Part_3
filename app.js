// app.js
require('dotenv').config(); // load .env
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// ===== Routes =====
const renderRoutes = require('./routes/renderRoutes'); // routes chính

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// method-override để xử lý PUT/DELETE trong form HTML
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // folder views

// ===== MongoDB =====
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mvcApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ===== Session =====
app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecretkey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mvcApp',
    collectionName: 'sessions'
  }),
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 giờ
}));

// ===== Use routes =====
app.use('/', renderRoutes); // tất cả route đều qua renderRoutes

// ===== Start server =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
