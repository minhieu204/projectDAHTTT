// src/apis/customerAPIs.js
import axios from 'axios'
import { API_ROOT } from '../util/constants'

// Danh sách khách hàng
export const fetchCustomersAPI = async (token) => {
  const res = await axios.get(`${API_ROOT}/v1/customers`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
  return res.data
}

// Tìm kiếm khách hàng theo q (name/email)
export const searchCustomersAPI = async (q, token) => {
  const res = await axios.get(`${API_ROOT}/v1/customers/search?q=${encodeURIComponent(q)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
  return res.data
}

// Chi tiết 1 khách hàng
export const getCustomerDetailAPI = async (id, token) => {
  const res = await axios.get(`${API_ROOT}/v1/customers/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
  return res.data
}

// Tóm tắt: số đơn + tổng tiền + hạng thẻ
export const getCustomerSummaryAPI = async (id, token) => {
  const res = await axios.get(`${API_ROOT}/v1/customers/${id}/summary`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
  return res.data // { user, stats: { totalOrders, totalAmount, tier } }
}

// Lấy danh sách đơn hàng của 1 khách
// (backend hiện tại nhận query userId; nếu server của bạn dùng tên khác -> chỉ cần đổi 'userId' ở URL)
export const getCustomerOrdersAPI = async (customerId, token) => {
  const res = await axios.get(`${API_ROOT}/v1/order?userId=${encodeURIComponent(customerId)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
  return res.data
}
