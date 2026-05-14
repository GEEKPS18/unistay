const express = require('express');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const { loginRules } = require('../validators/ownerValidator');
const validate = require('../middlewares/validate');
const {
  loginAdmin,
  getAllStudents,
  getAllOwners,
  deleteUser,
  getStats,
} = require('../controllers/Auth/adminAuthController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only management endpoints
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Login as admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginRules, validate, loginAdmin);

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Get real-time dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student, owner, residence, and rating counts
 */
router.get('/stats', protect, authorizeRoles('admin'), getStats);

/**
 * @swagger
 * /admin/students:
 *   get:
 *     summary: Get all registered students
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all students
 */
router.get('/students', protect, authorizeRoles('admin'), getAllStudents);

/**
 * @swagger
 * /admin/owners:
 *   get:
 *     summary: Get all registered owners
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all owners
 */
router.get('/owners', protect, authorizeRoles('admin'), getAllOwners);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete any user by ID (cannot delete another admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 *       403:
 *         description: Cannot delete admin
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', protect, authorizeRoles('admin'), deleteUser);

module.exports = router;
