import { StatusCodes } from 'http-status-codes'
import { productService } from '~/services/productService'

const createNew = async (req, res, next) => {
  try {
    const createdProduct = await productService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdProduct)
    
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const product = await productService.getDetails(req.params.id)

    res.status(StatusCodes.OK).json(product)
    
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const products = await productService.getAll()
    res.status(StatusCodes.OK).json(products)
    
  } catch (error) {
    next(error)
  }
}

export const productController = {
  createNew,
  getDetails,
  getAll
}
