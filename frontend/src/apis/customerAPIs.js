import axios from 'axios'
const API_ROOT = import.meta.env.VITE_API_ROOT || 'http://localhost:8017'

export const fetchCustomerInsightsAPI = async () => {
  const { data } = await axios.get(`${API_ROOT}/v1/customer`)
  return data || []
}
export const fetchCustomerSummaryAPI = async () => {
  const { data } = await axios.get(`${API_ROOT}/v1/customer/summary`)
  return data || { totalCustomers: 0, totalOrders: 0, totalAmount: 0 }
}
export const searchCustomersAPI = async (name) => {
  const { data } = await axios.get(`${API_ROOT}/v1/customer/search`, { params: { name } })
  return data || []
}
