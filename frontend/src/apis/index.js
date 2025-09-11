import axios from 'axios'
import { API_ROOT } from '../util/constants'

export const fetchAllProductsAPI = async () => {
  const request = await axios.get(`${API_ROOT}/v1/product/getall`)
  return request.data
}