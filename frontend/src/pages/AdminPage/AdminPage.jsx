import { Box } from '@mui/material'
import React from 'react'
import AppBar from '~/components/admin/AppBar/AppBar'
import MainPage from '~/components/admin/MainPage/MainPage'
import SideBar from '~/components/admin/SideBar/SideBar'

function AdminPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
      }}
    >
      <SideBar />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: (theme) => theme.admin.focusColor
        }}
      >
        <Box sx={{ flex: '0 0 72px' }}>
          <AppBar />
        </Box>
        <Box sx={{ flex: '1', overflow: 'auto' }}>
          <MainPage />
        </Box>
      </Box>
    </Box>
  )
}

export default AdminPage
