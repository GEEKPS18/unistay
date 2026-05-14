const express = require('express');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const { postRules, idParamRules } = require('../validators/ratingValidator');
const validate = require('../middlewares/validate');
const ratingController = require('../controllers/ratingController');

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Residence ratings and reviews
 */

/**
 * @swagger
 * /residence/{residenceId}/Ratings:
 *   get:
 *     summary: Get all ratings for a residence
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of ratings for the residence
 *       404:
 *         description: Residence not found
 */
router.get('/', ratingController.getRatings);

/**
 * @swagger
 * /residence/{residenceId}/Ratings/student/{studentId}:
 *   post:
 *     summary: Post a new rating for a residence
 *     tags: [Ratings]
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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               starCount:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *                 maxLength: 1000
 *               issues:
 *                 type: string
 *                 maxLength: 1000
 *     responses:
 *       201:
 *         description: Rating posted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Residence or student not found
 */
router.post(
  '/student/:studentId',
  protect,
  authorizeRoles('student'),
  postRules,
  validate,
  ratingController.postRating,
);

/**
 * @swagger
 * /residence/{residenceId}/Ratings/{id}:
 *   put:
 *     summary: Update a rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               starCount:
 *                 type: integer
 *               comment:
 *                 type: string
 *               issues:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Rating not found
 */
router.put(
  '/:id',
  protect,
  authorizeRoles('student'),
  idParamRules,
  validate,
  ratingController.updateRating,
);

/**
 * @swagger
 * /residence/{residenceId}/Ratings/{id}/student/{studentId}:
 *   delete:
 *     summary: Delete a rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
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
 *         description: Rating deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Rating not found
 */
router.delete(
  '/:id/student/:studentId',
  protect,
  authorizeRoles('student'),
  idParamRules,
  validate,
  ratingController.deleteRating,
);

/**
 * @swagger
 * /residence/{residenceId}/Ratings/{id}/student/{studentId}/comment:
 *   delete:
 *     summary: Remove the comment from a rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
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
 *         description: Comment removed successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Rating not found
 */
router.delete(
  '/:id/student/:studentId/comment',
  protect,
  authorizeRoles('student'),
  idParamRules,
  validate,
  ratingController.deleteComment,
);

/**
 * @swagger
 * /residence/{residenceId}/Ratings/{id}/student/{studentId}/issue:
 *   delete:
 *     summary: Remove the issues field from a rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: residenceId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
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
 *         description: Issue removed successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Rating not found
 */
router.delete(
  '/:id/student/:studentId/issue',
  protect,
  authorizeRoles('student'),
  idParamRules,
  validate,
  ratingController.deleteIssue,
);

module.exports = router;
