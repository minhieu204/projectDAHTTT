import { StatusCodes } from 'http-status-codes'
import { customerService } from '~/services/customerService'

const createNew = async (req, res, next) => {
  try {
    const created = await customerService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(created)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const customer = await customerService.getDetails(req.params.id)
    res.status(StatusCodes.OK).json(customer)
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const customers = await customerService.getAll()
    res.status(StatusCodes.OK).json(customers)
  } catch (error) {
    next(error)
  }
}

const deleteOne = async (req, res, next) => {
  try {
    const customerId = req.params.id
    const result = await customerService.deleteOne(customerId)
    res.status(StatusCodes.OK).json({
      message: 'Customer deleted successfully',
      deletedCount: result.deletedCount
    })
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
    const customers = await customerService.search(name.trim())
    res.status(StatusCodes.OK).json(customers)
  } catch (error) {
    // có thể thay next(error) bằng trả về 500 để tránh lộ stack
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
  }
}

const updateOne = async (req, res, next) => {
  try {
    const customerId = req.params.id
    const updated = await customerService.updateOne(customerId, req.body)
    res.status(StatusCodes.OK).json(updated)
  } catch (error) {
    next(error)
  }
}

export const customerController = {
  createNew,
  getDetails,
  getAll,
  deleteOne,
  search,
  updateOne
}
