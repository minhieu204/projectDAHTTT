import { Box, Button, Tooltip, Typography } from '@mui/material'
import React from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import TableCustomer from '~/components/admin/TableCustomer/TableCustomer'
import { useNavigate } from 'react-router-dom'

function CustomerPage() {
  const navigate = useNavigate()
  const handleAddClick = () => {
    navigate('/admin/customer/add-customer')
  }
  const handleEditClick = (customerId) => {
    navigate(`/admin/customer/edit-customer/${customerId}`)
  }
  return (
    <Box
      sx={{
        backgroundColor: '#343a40',
        height: 'auto',
        overflow: 'auto',
        mx: 5,
        my: 1,
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
          Quản Lý Khách Hàng
        </Typography>
        <Tooltip title='Thêm khách hàng'>
          <Button onClick={handleAddClick} sx={{ backgroundColor: '#66FF99', height: '40px', minWidth: '46px' }}>
            <AddOutlinedIcon sx={{ color: 'white' }}/>
          </Button>
        </Tooltip>
      </Box>
      <Box sx={{ px: 6 }}>
        <TableCustomer onEditCustomer={handleEditClick} />
      </Box>
    </Box>
  )
}

export default CustomerPage
