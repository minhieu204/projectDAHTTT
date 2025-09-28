import { Box } from '@mui/material'
import Header from '~/components/customer/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '~/components/customer/Footer/Footer'

function CustomerPage() {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden', overflowY: 'hidden' }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default CustomerPage