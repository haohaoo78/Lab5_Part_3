const User = require("../models/User");
const bcrypt = require("bcryptjs");

// register, login, logout, forgotPassword
exports.register = async (req, res) => {
  // Tạo user mới
};

exports.login = async (req, res) => {
  // Kiểm tra user, set session
};

exports.logout = (req, res) => {
  // Destroy session
};
