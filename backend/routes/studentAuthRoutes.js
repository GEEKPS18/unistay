const express = require('express');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const { registerRules, loginRules } = require('../validators/studentValidator');
const validate = require('../middlewares/validate');
const {
  registerStudent,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
} = require('../controllers/Auth/studentAuthController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student authentication and profile management
 */

/**
 * @swagger
 * /student/register:
 *   post:
 *     summary: Register a new student account
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, last_name, email, password]
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               major:
 *                 type: string
 *               year_of_study:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 6
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *     responses:
 *       201:
 *         description: Student registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
router.post('/register', registerRules, validate, registerStudent);

/**
 * @swagger
 * /student/login:
 *   post:
 *     summary: Login a student and receive a JWT token
 *     tags: [Students]
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
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', loginRules, validate, loginStudent);

/**
 * @swagger
 * /student/profile:
 *   get:
 *     summary: Get the logged-in student's profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student profile data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Student not found
 */
router.get('/profile', protect, authorizeRoles('student'), getStudentProfile);

/**
 * @swagger
 * /student/profile:
 *   put:
 *     summary: Update the logged-in student's profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               major:
 *                 type: string
 *               year_of_study:
 *                 type: integer
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Not authorized
 */
router.put('/profile', protect, authorizeRoles('student'), updateStudentProfile);

/**
 * @swagger
 * /student/profile:
 *   delete:
 *     summary: Delete the logged-in student's account
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Not authorized
 */
router.delete('/profile', protect, authorizeRoles('student'), deleteStudentProfile);

module.exports = router;
