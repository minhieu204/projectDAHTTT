import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Không có token'))
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token không hợp lệ'))
  }
}
