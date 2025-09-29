import axios from 'axios'
import { API_ROOT } from '../util/constants'

export const registerUserAPI = async (userData) => {
  const request = await axios.post(`${API_ROOT}/v1/user/register`, userData)
  return request.data
}

export const loginUserAPI = async (loginData) => {
  const request = await axios.post(`${API_ROOT}/v1/user/login`, loginData)
  console.log(request.data)
  return request.data
}

export const getProfileAPI = async (token) => {
  const request = await axios.get(`${API_ROOT}/v1/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return request.data
}

export const updateUserAPI = async (userId, updateData, token) => {
  const request = await axios.put(`${API_ROOT}/v1/user/${userId}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return request.data
}
