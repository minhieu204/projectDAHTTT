import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    console.log('req.body: ',req.body)

    res.status(StatusCodes.CREATED).json({ message: 'APIs post product controller.', code: StatusCodes.CREATED})
    
  } catch (error) {
    next(error)
  }
}

export const productController = {
  createNew
}
