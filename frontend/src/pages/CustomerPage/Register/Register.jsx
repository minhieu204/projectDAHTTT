import { Box, Typography } from '@mui/material'
import React from 'react'
import FieldCustom from '~/components/admin/FieldCustom/FieldCustom'

function Register() {
  return (
    <Box sx={{ height: '100vh', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{
          width: '500px',
          height: '400px',
          backgroundColor: '#343a40',
          px: 4,
          py: 2,
          borderRadius: '16px'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', }}>
          <Typography variant='h4' fontWeight='bold' color='white'>
            Đăng nhập
          </Typography>
        </Box>
        <Box>
          <FieldCustom
            label="Email"
            required
            placeholder="Nhập email..."
            name="price"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Register
