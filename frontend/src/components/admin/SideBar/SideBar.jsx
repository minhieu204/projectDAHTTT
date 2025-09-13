import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import SideBarItem from './SideBarItem/SideBarItem'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

function SideBar() {
  return (
    <Box
      sx={{
        backgroundColor: '#343a40',
        flex: '0 0 250px',
      }}
    >
      <Box
        sx={{
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img src="logo.png" alt="" style={{ width: '120px' }} />
      </Box>
      <Box
        sx={{
          height: 'calc(100% - 72px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          py: '10px'
        }}
      >
        <SideBarItem icon={DashboardOutlinedIcon} title='Trang Chủ' />
        <SideBarItem icon={PersonOutlineOutlinedIcon} title='Quản Lý Tài Khoản' />
        <SideBarItem icon={ShoppingBagOutlinedIcon} title='Quản Lý Sản Phẩm' />
        <SideBarItem icon={ListAltOutlinedIcon} title='Quản Lý Danh Mục' />
        <SideBarItem icon={ShoppingCartOutlinedIcon} title='Quản Lý Đơn Hàng' />
        <SideBarItem icon={DiscountOutlinedIcon} title='Quản Lý Khuyến Mãi' />
        <SideBarItem icon={RateReviewOutlinedIcon} title='Quản Lý Đánh Giá' />
        <SideBarItem icon={PeopleAltOutlinedIcon} title='Quản Lý Khách Hàng' />
        <SideBarItem icon={StoreOutlinedIcon} title='Quản Lý Chi Nhánh' />
      </Box>
    </Box>
  )
}

export default SideBar
