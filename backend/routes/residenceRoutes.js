const express = require('express');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { addRules, idParamRules, aiSearchRules } = require('../validators/residenceValidator');
const validate = require('../middlewares/validate');
const {
  addResidence,
  getAllResidences,
  getResidenceById,
  updateResidence,
  deleteResidence,
  aiSearch,
} = require('../controllers/residenceController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Residences
 *   description: Residence listing management and search
 */

/**
 * @swagger
 * /residence/add:
 *   post:
 *     summary: Add a new residence listing
 *     tags: [Residences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [address, rent_price]
 *             properties:
 *               address:
 *                 type: string
 *               rent_price:
 *                 type: number
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               housing_type:
 *                 type: string
 *               available_for:
 *                 type: string
 *               neighborhood:
 *                 type: string
 *               floor_num:
 *                 type: integer
 *               building_num:
 *                 type: string
 *               rooms:
 *                 type: integer
 *               bathrooms:
 *                 type: integer
 *               capacity:
 *                 type: integer
 *               distance_from_university:
 *                 type: integer
 *               wifi:
 *                 type: boolean
 *               parking:
 *                 type: boolean
 *               security:
 *                 type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Residence created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Access denied (owners only)
 */
router.post(
  '/add',
  protect,
  authorizeRoles('owner'),
  upload.array('images', 5),
  addRules,
  validate,
  addResidence,
);

/**
 * @swagger
 * /residence/ai-search:
 *   post:
 *     summary: AI-powered natural language property search
 *     tags: [Residences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [query]
 *             properties:
 *               query:
 *                 type: string
 *                 minLength: 3
 *                 example: "quiet apartment near the university with wifi"
 *     responses:
 *       200:
 *         description: Top 3 best-matching residences returned in ranked order
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 */
router.post('/ai-search', protect, aiSearchRules, validate, aiSearch);

/**
 * @swagger
 * /residence:
 *   get:
 *     summary: Get all residence listings
 *     tags: [Residences]
 *     responses:
 *       200:
 *         description: List of all residences
 */
router.get('/', getAllResidences);

/**
 * @swagger
 * /residence/{id}:
 *   get:
 *     summary: Get a single residence by ID
 *     tags: [Residences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Residence details
 *       404:
 *         description: Residence not found
 */
router.get('/:id', idParamRules, validate, getResidenceById);

/**
 * @swagger
 * /residence/{id}:
 *   put:
 *     summary: Update a residence listing (owner only)
 *     tags: [Residences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *     responses:
 *       200:
 *         description: Residence updated successfully
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not the listing owner
 *       404:
 *         description: Residence not found
 */
router.put('/:id', protect, authorizeRoles('owner'), idParamRules, validate, updateResidence);

/**
 * @swagger
 * /residence/{id}:
 *   delete:
 *     summary: Delete a residence listing (owner only)
 *     tags: [Residences]
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
 *         description: Residence deleted successfully
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not the listing owner
 *       404:
 *         description: Residence not found
 */
router.delete('/:id', protect, authorizeRoles('owner'), idParamRules, validate, deleteResidence);

module.exports = router;
