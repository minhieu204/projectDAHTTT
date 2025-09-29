import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

// Đăng ký
const register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body)
    res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    next(error)
  }
}

// Đăng nhập
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await userService.login(email, password)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

// Lấy thông tin cá nhân (cần middleware decode JWT)
const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId   // lấy từ middleware auth
    const user = await userService.getProfile(userId)
    res.status(StatusCodes.OK).json(user)
  } catch (error) {
    next(error)
  }
}

// Cập nhật thông tin
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const updatedUser = await userService.updateProfile(userId, req.body)
    res.status(StatusCodes.OK).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  register,
  login,
  getProfile,
  updateProfile
}
