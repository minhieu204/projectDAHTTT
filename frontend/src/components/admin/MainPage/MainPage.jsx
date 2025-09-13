import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import TableProduct from './TableProduct/TableProduct'

function MainPage() {
  return (
    <Box
      sx={{
        backgroundColor: '#343a40',
        height: 'auto',
        overflow: 'auto',
        mx: 5,
        my: 12,
        borderRadius: '8px'
      }}
    >
      <Box
        sx={{
          color: 'white',
          m: '16px 48px 16px 16px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant='h5'>
          Quản Lý Sản Phẩm
        </Typography>
        <Button sx={{ backgroundColor: '#66FF99', height: '40px', minWidth: '46px' }}>
          <AddOutlinedIcon sx={{ color: 'white' }}/>
        </Button>
      </Box>
      <Box sx={{ px: 6 }}>
        <TableProduct />
      </Box>
    </Box>
  )
}

export default MainPage
