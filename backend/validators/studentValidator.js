const { body } = require('express-validator');

const registerRules = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required'),

  body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  // Optional fields — only validate format when provided
  body('year_of_study')
    .optional()
    .isInt({ min: 1, max: 6 }).withMessage('Year of study must be between 1 and 6'),

  body('gender')
    .optional()
    .isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
];

const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required'),
];

module.exports = { registerRules, loginRules };
