const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
