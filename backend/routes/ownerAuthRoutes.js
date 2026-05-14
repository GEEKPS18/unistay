const express = require('express');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const { registerRules, loginRules } = require('../validators/ownerValidator');
const validate = require('../middlewares/validate');
const {
  registerOwner,
  loginOwner,
  getOwnerProfile,
  updateOwnerProfile,
  deleteOwnerProfile,
} = require('../controllers/Auth/ownerAuthController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Owners
 *   description: Owner authentication and profile management
 */

/**
 * @swagger
 * /owner/register:
 *   post:
 *     summary: Register a new property owner account
 *     tags: [Owners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, last_name, email, password, phone_num]
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
 *               phone_num:
 *                 type: string
 *     responses:
 *       201:
 *         description: Owner registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
router.post('/register', registerRules, validate, registerOwner);

/**
 * @swagger
 * /owner/login:
 *   post:
 *     summary: Login an owner and receive a JWT token
 *     tags: [Owners]
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
router.post('/login', loginRules, validate, loginOwner);

/**
 * @swagger
 * /owner/profile:
 *   get:
 *     summary: Get the logged-in owner's profile
 *     tags: [Owners]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Owner profile data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Owner not found
 */
router.get('/profile', protect, authorizeRoles('owner'), getOwnerProfile);

/**
 * @swagger
 * /owner/profile:
 *   put:
 *     summary: Update the logged-in owner's profile
 *     tags: [Owners]
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
 *               phone_num:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Not authorized
 */
router.put('/profile', protect, authorizeRoles('owner'), updateOwnerProfile);

/**
 * @swagger
 * /owner/profile:
 *   delete:
 *     summary: Delete the logged-in owner's account
 *     tags: [Owners]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Not authorized
 */
router.delete('/profile', protect, authorizeRoles('owner'), deleteOwnerProfile);

module.exports = router;
