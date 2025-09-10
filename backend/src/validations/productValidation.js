import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
      name: Joi.string().required().min(3).max(50).trim().strict().messages({
        "any.required": "name is required!!",
        "string.empty": "name can't be empty!!",
        'string.max': 'name length must be less than or equal to 50 characters long',
        'string.min': 'name length must be at least 3 characters long',
        'string.trim': 'name must not have leading or trailing whitespace',
      }),
      description: Joi.string().required().min(3).max(50).trim().strict()
    })

    try {
      await correctCondition.validateAsync(req.body, { abortEarly: false })
      next()
    } catch (error) {
      console.log(error)
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        errors: new Error(error).message
      })
    }
  }

export const productValidation = {
  createNew
}