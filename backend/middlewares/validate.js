const { validationResult } = require('express-validator');

/**
 * Runs after express-validator rules and collects all errors.
 * If any exist, respond immediately with 400 and a list of field-level messages.
 * Otherwise hand control to the next middleware / controller.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  next();
};

module.exports = validate;
