// routes/suppliers.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/supplierController");
const { isAuthenticated } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Quản lý nhà cung cấp
 */

// ===== Routes view =====
router.get("/", isAuthenticated, ctrl.renderSuppliers);        // Trang danh sách
router.get("/new", isAuthenticated, ctrl.renderNewSupplier);  // Trang thêm mới
router.get("/:id/edit", isAuthenticated, ctrl.renderEditSupplier); // Trang sửa

// ===== Routes API =====
/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Tạo mới nhà cung cấp
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nhà cung cấp đã được tạo
 */
router.post("/", isAuthenticated, ctrl.createSupplier);

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Cập nhật nhà cung cấp
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nhà cung cấp đã được cập nhật
 */
router.put("/:id", isAuthenticated, ctrl.updateSupplier);

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Xóa nhà cung cấp
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nhà cung cấp đã bị xóa
 */
router.delete("/:id", isAuthenticated, ctrl.deleteSupplier);

module.exports = router;
