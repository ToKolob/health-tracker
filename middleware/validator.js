const { body, validationResult } = require('express-validator')


const sleepTimeValidationRules = () => {
  return [
    body('duration').isNumeric().withMessage('Duration must be a number').notEmpty().withMessage('Duration is required'),
    body('date').isString().notEmpty().withMessage('Date is required'),
    body('quality').isString().notEmpty().withMessage('Quality is required'),
  ]
}
const exerciseValidationRules = () => {
  return [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString(),
    body('duration').isNumeric().notEmpty().withMessage('Duration is required'),
    body('date').isString().notEmpty().withMessage('Date is required')
    
  ]
}

const mealValidationRules = () => {
  return [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('date').isString().notEmpty().withMessage('Date is required'),
    body('calories').isString().notEmpty().withMessage('calories is required'),
    body('tags').isString().notEmpty().withMessage('tags is required'),
    body('satisfaction').isString().notEmpty().withMessage('satisfaction is required'),
    body('mealType').isString().notEmpty().withMessage('mealType is required'),
  ]  
}
const waterValidationRules = () => {
  return [
    body('quantity').isNumeric().withMessage('Quantity must be a number').notEmpty().withMessage('Quantity is required'),
    body('date').isString().withMessage('Date must be a string').notEmpty().withMessage('Date is required'),
  ]
}

const validate = (req, res, next) => {''
  
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(412).json({
    errors: extractedErrors,
  })
}


module.exports = {

  sleepTimeValidationRules,
  exerciseValidationRules,
  mealValidationRules,
  waterValidationRules,
  validate
}