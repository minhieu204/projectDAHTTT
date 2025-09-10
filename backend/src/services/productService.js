import { slugify } from '~/utils/formatters'
import { productModel } from '~/models/productModel'
 
const createNew = async (reqBody) => {
  try {
    const newProduct = {
      ...reqBody,
      slug: slugify(reqBody.name)
    }

    const createdProduct = await productModel.createNew(newProduct)

    const getNewProduct = await productModel.findOneId(createdProduct.insertedId)

    return getNewProduct
  } catch (error) {
    throw error
  }
}

export const productService = {
  createNew
}