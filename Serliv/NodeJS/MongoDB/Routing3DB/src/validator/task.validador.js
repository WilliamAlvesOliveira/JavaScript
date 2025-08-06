const { body, validationResult } = require('express-validator');

// Validações para POST (criação)
const validateCreate = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters')
    .isLength({ max: 150 }).withMessage('Title cannot exceed 150 characters'),
  
  body('userId')
    .notEmpty().withMessage('User ID is required')
    .isString().withMessage('User ID must be a string'),
    
  body('completed')
    .optional()
    .isBoolean().withMessage('Completed must be a boolean')
];

// Validações para PUT (atualização completa)
const validateUpdate = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters')
    .isLength({ max: 150 }).withMessage('Title cannot exceed 150 characters'),
  
  body('userId')
    .optional()
    .notEmpty().withMessage('User ID cannot be empty')
    .isString().withMessage('User ID must be a string'),
    
  body('completed')
    .optional()
    .isBoolean().withMessage('Completed must be a boolean')
];

// Validações para PATCH (atualização parcial)
const validatePartialUpdate = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters')
    .isLength({ max: 150 }).withMessage('Title cannot exceed 150 characters'),
  
  body('userId')
    .optional()
    .notEmpty().withMessage('User ID cannot be empty')
    .isString().withMessage('User ID must be a string'),
    
  body('completed')
    .optional()
    .isBoolean().withMessage('Completed must be a boolean')
];

// Middleware que verifica o resultado das validações
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = {
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  checkValidation
};