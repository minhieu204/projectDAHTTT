import { Box } from '@mui/material'
import React from 'react'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

function AppBar() {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        flex: '1',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2
      }}
    >
      <Box
        sx={{
          height: '50px',
          fontSize: '20px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'none'
        }}
      >
        Xin chào, Nguyễn Minh Hiếu
      </Box>
      <Box
        sx={{
          height: '50px',
          fontSize: '20px',
          color: 'white',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'none'
        }}
      >
        <LogoutOutlinedIcon sx={{ fontSize: 28 }}/>
        Đăng Xuất
      </Box>
    </Box>
  )
}

export default AppBar
