import express from "express"
import { StatusCodes } from 'http-status-codes'
import { productValidation } from '~/validations/productValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'APIs get product.', code: StatusCodes.OK})
  })
  .post(productValidation.createNew)

export const productRoute = Router