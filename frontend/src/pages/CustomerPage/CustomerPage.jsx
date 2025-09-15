import { Box } from '@mui/material'
import Header from '~/components/customer/Header/Header'
import { Outlet } from 'react-router-dom'

function CustomerPage() {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden', overflowY: 'hidden' }}>
      <Header />
      <Outlet />
    </Box>
  )
}

export default CustomerPage