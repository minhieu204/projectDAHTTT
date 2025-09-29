import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret' // 🔑 Đặt trong .env

// ✅ Đăng ký
const register = async (data) => {
  const existed = await userModel.findByEmail(data.email)
  if (existed) throw new ApiError(StatusCodes.CONFLICT, 'Email đã tồn tại')

  const createdUser = await userModel.createNew(data)
  const newUser = await userModel.findOneId(createdUser.insertedId)

  // Ẩn password trước khi trả về
  delete newUser.password
  return newUser
}

// ✅ Đăng nhập
const login = async (email, password) => {
  const user = await userModel.findByEmail(email)
  if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Sai email hoặc mật khẩu')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Sai email hoặc mật khẩu')

  const token = jwt.sign(
    { userId: user._id.toString(), role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )

  delete user.password
  return { token, user }
}

// ✅ Lấy thông tin user
const getProfile = async (userId) => {
  const user = await userModel.findOneId(userId)
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User không tồn tại')
  delete user.password
  return user
}

// ✅ Cập nhật user
const updateProfile = async (userId, updateData) => {
  updateData.updatedAt = Date.now()
  const updatedUser = await userModel.updateOne(userId, updateData)
  if (!updatedUser) throw new ApiError(StatusCodes.NOT_FOUND, 'User không tồn tại')
  delete updatedUser.password
  return updatedUser
}

export const userService = {
  register,
  login,
  getProfile,
  updateProfile
}
