const Supplier = require("../models/Supplier");

// Lấy danh sách nhà cung cấp
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy 1 nhà cung cấp theo id
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm mới nhà cung cấp
exports.createSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const supplier = new Supplier({ name, address, phone });
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật nhà cung cấp
exports.updateSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { name, address, phone },
      { new: true, runValidators: true }
    );
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa nhà cung cấp
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
