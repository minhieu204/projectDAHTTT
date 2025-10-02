import Joi from "joi"
import { ObjectId } from "mongodb"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators"
import { GET_DB } from "~/config/mongodb"

const CART_COLLECTION_NAME = "carts"

// Schema cho từng item
const CART_ITEM_SCHEMA = Joi.object({
  productId: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .required(),
  quantity: Joi.number().integer().min(1).default(1)
})

// Schema cho giỏ hàng
const CART_COLLECTION_SCHEMA = Joi.object({
  userId: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .required(),
  items: Joi.array().items(CART_ITEM_SCHEMA).default([]),
  createdAt: Joi.date().timestamp("javascript").default(() => Date.now()),
  updatedAt: Joi.date().timestamp("javascript").default(() => Date.now())
})

// Validate trước khi create
const validateBeforeCreate = async (data) => {
  return await CART_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

// Tạo cart mới
const createNew = async (data) => {
  const validData = await validateBeforeCreate(data)
  return await GET_DB()
    .collection(CART_COLLECTION_NAME)
    .insertOne(validData)
}

// Lấy cart theo userId
const findByUserId = async (userId) => {
  return await GET_DB().collection(CART_COLLECTION_NAME).findOne({ userId })
}

// Thêm sản phẩm vào cart (tự tạo nếu chưa có)
const addToCart = async (userId, productId, quantity = 1) => {
  let cart = await findByUserId(userId)
  
  if (!cart) {
    const result = await createNew({
      userId,
      items: [{ productId, quantity }],
    })
    // Lấy cart mới tạo từ DB
    cart = await findByUserId(userId)
    return cart
  }

  const index = cart.items.findIndex(i => i.productId === productId)
  if (index >= 0) {
    cart.items[index].quantity += quantity
  } else {
    cart.items.push({ productId, quantity })
  }

  const result = await GET_DB().collection(CART_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: new ObjectId(cart._id) },
      { $set: { items: cart.items, updatedAt: Date.now() } },
      { returnDocument: "after" }
    )
  return result
}


// Cập nhật số lượng sản phẩm
const updateQuantity = async (userId, productId, quantity) => {
  if (quantity < 1) throw new Error("Quantity must be at least 1")

  const cart = await findByUserId(userId)
  if (!cart) throw new Error("Cart not found")

  const index = cart.items.findIndex(
    (i) => i.productId.toString() === productId.toString()
  )
  if (index < 0) throw new Error("Product not in cart")

  cart.items[index].quantity = quantity

  const result = await GET_DB().collection(CART_COLLECTION_NAME).findOneAndUpdate(
    { _id: new ObjectId(cart._id) },
    { $set: { items: cart.items, updatedAt: Date.now() } },
    { returnDocument: "after" }
  )
  return result.value
}

// Xóa 1 sản phẩm
const removeItem = async (userId, productId) => {
  const cart = await findByUserId(userId)
  if (!cart) throw new Error("Cart not found")

  const newItems = cart.items.filter(
    (i) => i.productId.toString() !== productId.toString()
  )

  const result = await GET_DB().collection(CART_COLLECTION_NAME).findOneAndUpdate(
    { _id: new ObjectId(cart._id) },
    { $set: { items: newItems, updatedAt: Date.now() } },
    { returnDocument: "after" }
  )
  return result.value
}

// Xóa hết sản phẩm
const clearCart = async (userId) => {
  return await GET_DB().collection(CART_COLLECTION_NAME).findOneAndUpdate(
    { userId },
    { $set: { items: [], updatedAt: Date.now() } },
    { returnDocument: "after" }
  )
}

// Lấy tất cả cart
const getAll = async () => {
  return await GET_DB().collection(CART_COLLECTION_NAME).find().toArray()
}

// Xóa cart theo _id
const deleteOne = async (cartId) => {
  return await GET_DB()
    .collection(CART_COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(cartId) })
}

export const cartModel = {
  CART_COLLECTION_NAME,
  CART_COLLECTION_SCHEMA,
  createNew,
  findByUserId,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
  getAll,
  deleteOne
}
