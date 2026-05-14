const { body, param } = require('express-validator');

const postRules = [
  // At least one of starCount, comment, or issues must be provided
  body('starCount')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('Star count must be between 1 and 5'),

  body('comment')
    .optional()
    .isString().withMessage('Comment must be a string')
    .isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters'),

  body('issues')
    .optional()
    .isString().withMessage('Issues must be a string')
    .isLength({ max: 1000 }).withMessage('Issues cannot exceed 1000 characters'),
];

const idParamRules = [
  param('id')
    .isInt({ min: 1 }).withMessage('Rating ID must be a positive integer'),
];

module.exports = { postRules, idParamRules };
