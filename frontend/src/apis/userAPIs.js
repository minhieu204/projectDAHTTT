import axios from 'axios'
import { API_ROOT } from '../util/constants'

export const registerUserAPI = async (userData) => {
  const request = await axios.post(`${API_ROOT}/v1/user/register`, userData)
  return request.data
}

export const loginUserAPI = async (loginData) => {
  const request = await axios.post(`${API_ROOT}/v1/user/login`, loginData)
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

export const updateUserAPI = async (updateData, token) => {
  const request = await axios.put(`${API_ROOT}/v1/user/profile`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return request.data
}
export const updateAccountAPI = async (id ,updateData, token) => {
  const request = await axios.put(`${API_ROOT}/v1/user/${id}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return request.data
}
export const searchUserAPI = async (query, token) => {
  const request = await axios.get(`${API_ROOT}/v1/user/search?name=${query}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return request.data
}
export const AllUsersAPI = async (token) => {
  const request = await axios.get(`${API_ROOT}/v1/user/`, {headers: {
    Authorization: `Bearer ${token}`
  }
  })
  return request.data
}
export const createUserAPI = async (userData, token) => {
  const response = await axios.post(`${API_ROOT}/v1/user/`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
export const deleteUserAPI = async (userId) => {
  const request = await axios.delete(`${API_ROOT}/v1/user/${userId}`)
  return request.data
}
export const getUserDetailAPI = async (userId) => {
  const request = await axios.get(`${API_ROOT}/v1/user/${userId}`)
  return request.data
}
