import express from 'express'
import { customerController } from '~/controllers/customerController.js'

const Router = express.Router()

Router.route('/')
  .get(customerController.getAll)
  .post(customerController.createNew)

Router.route('/search')
  .get(customerController.search)

Router.route('/:id')
  .get(customerController.getDetails)
  .delete(customerController.deleteOne)
  .put(customerController.updateOne)

export const customerRoute = Router
