const { body, param } = require('express-validator');

const addRules = [
  body('address')
    .trim()
    .notEmpty().withMessage('Address is required'),

  body('rent_price')
    .notEmpty().withMessage('Rent price is required')
    .isFloat({ min: 1 }).withMessage('Rent price must be a positive number'),

  body('rooms')
    .optional()
    .isInt({ min: 1 }).withMessage('Rooms must be a positive integer'),

  body('bathrooms')
    .optional()
    .isInt({ min: 1 }).withMessage('Bathrooms must be a positive integer'),

  body('distance_from_university')
    .optional()
    .isInt({ min: 1 }).withMessage('Distance must be a positive integer (minutes)'),

  body('capacity')
    .optional()
    .isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
];

const idParamRules = [
  param('id')
    .isInt({ min: 1 }).withMessage('Residence ID must be a positive integer'),
];

const aiSearchRules = [
  body('query')
    .trim()
    .notEmpty().withMessage('Search query is required')
    .isLength({ min: 3 }).withMessage('Query must be at least 3 characters'),
];

module.exports = { addRules, idParamRules, aiSearchRules };
