const { body, validationResult } = require('express-validator')


const sleepTimeValidationRules = () => {
  return [
    body('sleep_date').isString().notEmpty().withMessage('Sleep date is required'),
    body('bedtime').isString().notEmpty().withMessage('Bed time is required'),
    body('wakeup_time').isString().notEmpty().withMessage('Wake up time is required'),
    body('total_sleep_hours').isNumeric().notEmpty().withMessage('Total sleep hour is required'),
    body('sleep_quality').isString().notEmpty().withMessage('Sleep quality is required'),
    body('dreams_recorded').isString().notEmpty().withMessage('Dreams recorded is required'),
    body('notes').isString().notEmpty().withMessage('Notes is required'),
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

const waterIntakeValidationRules = () => {
  return [
    body('quantity').isNumeric().notEmpty().withMessage('Quantity is required'),
    body('date').isString().notEmpty().withMessage('Date is required'),
    body('time').isString().notEmpty().withMessage('Time is required'),
    body('tags').isString().notEmpty().withMessage('Tags should be a string'),
    body('type').isString().notEmpty().withMessage('Type of water is required'),
    body('hydrationReason').isString().notEmpty().withMessage('Hydration reason should be a string'),
    body('location').isString().notEmpty().withMessage('Location should be a string'),
  ];
};


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
  waterIntakeValidationRules,
  validate
}