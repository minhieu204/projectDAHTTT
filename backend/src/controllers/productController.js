import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res) => {
  try {
    console.log('req.body: ',req.body)

    res.status(StatusCodes.CREATED).json({ message: 'APIs post product controller.', code: StatusCodes.CREATED})
    
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const productController = {
  createNew
}
