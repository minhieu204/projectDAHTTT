import Joi from "joi"
import { ObjectId } from 'mongodb'
import { GET_DB } from "~/config/mongodb"

export const CUSTOMER_COLLECTION_NAME = 'customers'

export const CUSTOMER_COLLECTION_SCHEMA = Joi.object({
  // Basic profile
  name: Joi.string().required().min(3).max(255).trim().strict(),
  code: Joi.string().min(2).max(50).trim().strict().allow(null, ''),
  phone: Joi.string().required().min(8).max(20).trim().strict(),
  email: Joi.string().email({ tlds: { allow: false } }).trim().strict().allow(null, ''),
  address: Joi.string().required().min(3).max(500).trim().strict(),
  tier: Joi.string().valid('Member', 'Silver', 'Gold', 'Platinum').default('Member'),
  notes: Joi.string().max(1000).trim().strict().allow('', null),
  avatar: Joi.string().uri().trim().strict().allow('', null),

  // Audit
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const validateBeforeCreate = async (data) => {
  return await CUSTOMER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const created = await GET_DB().collection(CUSTOMER_COLLECTION_NAME).insertOne(validData)
    return created
  } catch (error) {
    throw new Error(error)
  }
}

const findOneId = async (id) => {
  try {
    const result = await GET_DB().collection(CUSTOMER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  try {
    const result = await GET_DB().collection(CUSTOMER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async () => {
  try {
    const result = await GET_DB().collection(CUSTOMER_COLLECTION_NAME).find().toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteOne = async (customerId) => {
  try {
    const result = await GET_DB().collection(CUSTOMER_COLLECTION_NAME).deleteOne({
      _id: new ObjectId(customerId)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const search = async (query) => {
  try {
    const regex = new RegExp(query, 'i')
    const result = await GET_DB()
      .collection(CUSTOMER_COLLECTION_NAME)
      .find({ name: regex })
      .toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const updateOne = async (customerId, updateData) => {
  try {
    const result = await GET_DB()
      .collection(CUSTOMER_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(customerId) },
        { $set: updateData },
        { returnDocument: 'after' }
      )

    if (!result.value) {
      return await GET_DB()
        .collection(CUSTOMER_COLLECTION_NAME)
        .findOne({ _id: new ObjectId(customerId) })
    }

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Ensure DB indexes for customers collection
 * - Unique phone (sparse)
 * - Unique email (sparse)
 * - Text index for name & code (for search)
 */
const createCustomerIndexes = async () => {
  const col = GET_DB().collection(CUSTOMER_COLLECTION_NAME)
  await col.createIndex({ phone: 1 }, { unique: true, sparse: true, name: 'uniq_customer_phone' })
  await col.createIndex({ email: 1 }, { unique: true, sparse: true, name: 'uniq_customer_email' })
  await col.createIndex({ name: "text", code: "text" }, { name: 'text_customer_name_code' })
}

export const customerModel = {
  CUSTOMER_COLLECTION_NAME,
  CUSTOMER_COLLECTION_SCHEMA,
  createNew,
  findOneId,
  getDetails,
  getAll,
  deleteOne,
  search,
  updateOne,
  createCustomerIndexes
}
