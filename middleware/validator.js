const { body, validationResult } = require('express-validator')


const sleepTimeValidationRules = () => {

  return [
    body('duration').isNumeric().notEmpty().withMessage('Duration is required'),
    body('date').isString().notEmpty().withMessage('Date is required'),
    body('quality').isString().notEmpty().withMessage('Quality is required'),
  ]
}

const scripturesValidationRules = () =>{
  console.log('scripturesValidationRules');
    return [
    body('class').isString().notEmpty().withMessage('Class is required'),
    body('book').isString().notEmpty().withMessage('Book is required'),
    body('chapter').notEmpty().withMessage('Chapter is required'),
    body('verse').notEmpty().withMessage('Verse is required'),
    body('text').notEmpty().withMessage('Text is required')
  ]
}


const validate = (req, res, next) => {''
  console.log('validate');
  
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
  scripturesValidationRules,
  sleepTimeValidationRules,
  validate
}