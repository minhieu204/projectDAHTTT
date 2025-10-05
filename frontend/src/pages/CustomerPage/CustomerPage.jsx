import { Box } from '@mui/material'
import Header from '~/components/customer/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '~/components/customer/Footer/Footer'
import { useEffect } from 'react'

function CustomerPage() {
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const userStr = localStorage.getItem('user')
    const user = JSON.parse(userStr)
    const id = user._id
    const hasVisited = sessionStorage.getItem('visitedcustomer')
    if (!hasVisited) {
      if (id) {
        navigator.sendBeacon(`http://localhost:8017/v1/user/login/${id}`, null)
        sessionStorage.setItem('visited', 'true')
      }
    }
    const handleBeforeUnload = () => {
      if (!token) return
      navigator.sendBeacon(`http://localhost:8017/v1/user/logout/${id}`, null)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden', overflowY: 'hidden' }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default CustomerPage