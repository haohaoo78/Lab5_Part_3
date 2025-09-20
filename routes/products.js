// routes/products.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/productController");
const { isAuthenticated } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Quản lý sản phẩm
 */

// ===== Routes view =====
router.get("/", isAuthenticated, ctrl.renderProducts);         // Danh sách sản phẩm
router.get("/new", isAuthenticated, ctrl.renderNewProduct);    // Form thêm mới
router.get("/:id/edit", isAuthenticated, ctrl.renderEditProduct); // Form sửa

// ===== Routes API =====
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Tạo mới sản phẩm
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               supplierId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sản phẩm đã được tạo
 */
router.post("/", isAuthenticated, ctrl.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     tags: [Products]
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
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               supplierId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sản phẩm đã được cập nhật
 */
router.put("/:id", isAuthenticated, ctrl.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sản phẩm đã bị xóa
 */
router.delete("/:id", isAuthenticated, ctrl.deleteProduct);

module.exports = router;
