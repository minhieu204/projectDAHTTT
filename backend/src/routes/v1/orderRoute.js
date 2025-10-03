import express from "express"
import { orderController } from '~/controllers/orderController'

const Router = express.Router()

// Lấy danh sách đơn hàng hoặc tạo mới đơn hàng
Router.route('/')
  .get(orderController.getAll) // Admin lấy hết, User chỉ lấy của mình
  .post(orderController.createNew)

// Search đơn hàng (theo keyword: tên KH, email, status...)
Router.route('/search')
  .get(orderController.search)

// Các thao tác với 1 đơn hàng cụ thể
Router.route('/:id')
  .get(orderController.getDetails)
  .delete(orderController.deleteOne)
  .put(orderController.updateOne)

Router.post('/:id/confirm', orderController.confirmOrder)

export const orderRoute = Router
