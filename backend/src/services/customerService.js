import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { customerModel } from '~/models/customerModel'

const createNew = async (reqBody) => {
  try {
    const newCustomer = {
      name: reqBody.name?.trim(),
      code: reqBody.code?.trim() || null,
      phone: reqBody.phone?.trim(),
      email: reqBody.email?.trim() || null,
      address: reqBody.address?.trim(),
      tier: reqBody.tier || 'Member',
      notes: reqBody.notes?.trim() || '',
      avatar: reqBody.avatar || null
    }

    const created = await customerModel.createNew(newCustomer)
    const getNew = await customerModel.findOneId(created.insertedId)
    return getNew
  } catch (error) {
    throw error
  }
}

const getDetails = async (customerId) => {
  try {
    const customer = await customerModel.getDetails(customerId)
    if (!customer) throw new ApiError(StatusCodes.NOT_FOUND, 'Customer not found')
    return customer
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    const customers = await customerModel.getAll()
    if (!customers) throw new ApiError(StatusCodes.NOT_FOUND, 'No customers found')
    return customers
  } catch (error) {
    throw error
  }
}

const deleteOne = async (customerId) => {
  try {
    const result = await customerModel.deleteOne(customerId)
    if (!result) throw new ApiError(StatusCodes.NOT_FOUND, 'No customers found')
    return result
  } catch (error) {
    throw error
  }
}

const search = async (name) => {
  try {
    const customers = await customerModel.search(name)
    if (!customers) throw new ApiError(StatusCodes.NOT_FOUND, 'No customers found matching your query')
    return customers
  } catch (error) {
    throw error
  }
}

const updateOne = async (customerId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updated = await customerModel.updateOne(customerId, updateData)
    if (!updated) throw new ApiError(StatusCodes.NOT_FOUND, 'Customer not found to update')
    return updated
  } catch (error) {
    throw error
  }
}

export const customerService = {
  createNew,
  getDetails,
  getAll,
  deleteOne,
  search,
  updateOne
}
