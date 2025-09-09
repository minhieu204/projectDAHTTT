import express from "express"
import { StatusCodes } from 'http-status-codes'
import { productRoute } from '~/routes/v1/productRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.', code: StatusCodes.OK})
})

Router.use('/product', productRoute)

export const APIs_V1 = Router