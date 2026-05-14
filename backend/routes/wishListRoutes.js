const express = require('express');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Student wishlist (saved/liked residences)
 */

/**
 * @swagger
 * /residence/{residenceId}/wishlist:
 *   get:
 *     summary: Get all wishlisted residences for a student
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student's wishlist entries
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Student not found
 */
router.get('/', protect, authorizeRoles('student'), wishlistController.getAllWishedList);

/**
 * @swagger
 * /residence/{residenceId}/wishlist/student/{studentId}:
 *   post:
 *     summary: Add a residence to a student's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Residence added to wishlist
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Student or residence not found
 */
router.post('/student/:studentId', protect, authorizeRoles('student'), wishlistController.addToWishlist);

/**
 * @swagger
 * /residence/{residenceId}/wishlist/student/{studentId}:
 *   delete:
 *     summary: Remove a residence from a student's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Residence removed from wishlist
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Wishlist entry not found
 */
router.delete('/student/:studentId', protect, authorizeRoles('student'), wishlistController.removeFromWishlist);

module.exports = router;
