import express from "express";
// Import các hàm xử lý từ controller (có đuôi .js)
import {
  create,
  getAll,
  getDetail,
  update,
  remove,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     description: Trả về danh sách tất cả người dùng trong database
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Danh sách người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết một người dùng
 *     description: Trả về thông tin chi tiết của một người dùng theo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getDetail);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Tạo một người dùng mới
 *     description: Tạo một người dùng mới với thông tin được cung cấp
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       description: Thông tin người dùng cần tạo
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên người dùng
 *                 example: "Nguyễn Văn A"
 *               email:
 *                 type: string
 *                 description: Email người dùng
 *                 example: "user@example.com"
 *               phone:
 *                 type: string
 *                 description: Số điện thoại
 *                 example: "0912345678"
 *               age:
 *                 type: number
 *                 description: Tuổi
 *                 example: 25
 *     responses:
 *       201:
 *         description: Tạo người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", create);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     description: Cập nhật thông tin của một người dùng theo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       description: Các trường cần cập nhật
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên người dùng
 *                 example: "Nguyễn Văn B"
 *               email:
 *                 type: string
 *                 description: Email người dùng
 *                 example: "newuser@example.com"
 *               phone:
 *                 type: string
 *                 description: Số điện thoại
 *                 example: "0987654321"
 *               age:
 *                 type: number
 *                 description: Tuổi
 *                 example: 30
 *     responses:
 *       200:
 *         description: Cập nhật người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xóa một người dùng
 *     description: Xóa một người dùng theo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Xóa người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Xóa thành công"
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", remove);

export default router;
