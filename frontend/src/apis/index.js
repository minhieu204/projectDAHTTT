import axios from 'axios'
import { API_ROOT } from '../util/constants'

export const fetchAllProductsAPI = async () => {
  const request = await axios.get(`${API_ROOT}/v1/product/`)
  return request.data
}

export const deleteProductAPI = async (productId) => {
  const request = await axios.delete(`${API_ROOT}/v1/product/${productId}`)
  return request.data
}

export const searchProductsAPI = async (query) => {
  const request = await axios.get(`${API_ROOT}/v1/product/search?name=${query}`)
  return request.data
}