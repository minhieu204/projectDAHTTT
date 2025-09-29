import express from 'express'
import { userController } from '~/controllers/userController'
import { authMiddleware } from '~/middlewares/authMiddleware'   
import { userValidation } from '~/validations/userValidation'   

const Router = express.Router()

Router.route('/register')
  .post(userValidation.register, userController.register)

Router.route('/login')
  .post(userValidation.login, userController.login)

Router.route('/profile')
  .get(authMiddleware, userController.getProfile)
  .put(authMiddleware, userController.updateProfile)

export const userRoute = Router
