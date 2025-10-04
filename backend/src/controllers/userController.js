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
const search = async (req, res, next) => {
  try {
    const { name } = req.query

    if (!name || name.trim() === '') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Search query "name" is required' })
    }

    const products = await userService.search(name.trim())
    res.status(StatusCodes.OK).json(products)
  } catch (error) {
    console.error("Search error:", error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
  }
}
const getAll = async (req, res, next) => {
  try {
    const products = await userService.getAll()
    res.status(StatusCodes.OK).json(products)
    
  } catch (error) {
    next(error)
  }
}
const createUser = async (req, res, next) => {
  try {
    const createdUser = await userService.createUser(req.body)
    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (error) {
    next(error)
  }
}
const deleteOne = async (req, res, next) => {
  try {
    const productId = req.params.id
    const result = await userService.deleteOne(productId)
    res.status(StatusCodes.OK).json({ 
      message: 'User deleted successfully',
      deletedCount: result.deletedCount 
    })
  } catch (error) {
    next(error)
  }
}
const getDetails = async (req, res, next) => {
  try {
    const product = await userService.getDetails(req.params.id)

    res.status(StatusCodes.OK).json(product)
    
  } catch (error) {
    next(error)
  }
}
const updateAccount = async (req, res, next) => {
  try {
    const userId = req.params.id
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
  updateProfile,
  search,
  getAll,
  createUser,
  deleteOne,
  getDetails,
  updateAccount
}
