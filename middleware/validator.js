const { body, validationResult } = require('express-validator')


const sleepTimeValidationRules = () => {

  return [
    body('duration').isNumeric().notEmpty().withMessage('Duration is required'),
    body('date').isString().notEmpty().withMessage('Date is required'),
    body('quality').isString().notEmpty().withMessage('Quality is required'),
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
  validate
}