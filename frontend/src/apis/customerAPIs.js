import axios from 'axios'
import { API_ROOT } from '../util/constants'

// Reuse the same Cloudinary config pattern as products
const CLOUDINARY_CLOUD_NAME = 'dkw1qvcz6'
const CLOUDINARY_UPLOAD_PRESET = 'DAHTTT'

export const uploadImageToCloudinaryAPI = async (file) => {
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  const response = await axios.post(CLOUDINARY_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

// CRUD APIs for customers
export const fetchAllCustomersAPI = async () => {
  const request = await axios.get(`${API_ROOT}/v1/customer/`)
  return request.data
}

export const getCustomerDetailAPI = async (customerId) => {
  const request = await axios.get(`${API_ROOT}/v1/customer/${customerId}`)
  return request.data
}

export const deleteCustomerAPI = async (customerId) => {
  const request = await axios.delete(`${API_ROOT}/v1/customer/${customerId}`)
  return request.data
}

export const updateCustomerAPI = async (customerId, customerData) => {
  const request = await axios.put(`${API_ROOT}/v1/customer/${customerId}`, customerData)
  return request.data
}

export const searchCustomersAPI = async (query) => {
  const request = await axios.get(`${API_ROOT}/v1/customer/search?name=${query}`)
  return request.data
}

export const createCustomerAPI = async (customerData) => {
  const request = await axios.post(`${API_ROOT}/v1/customer/`, customerData)
  return request.data
}
