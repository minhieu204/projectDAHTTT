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
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import { useNavigate } from 'react-router-dom'

function SideBar() {
  const navigate = useNavigate()
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
        <img src="/logo.png" alt="" style={{ width: '120px' }} />
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
        <SideBarItem icon={DashboardOutlinedIcon} title='Trang Chủ' to="/admin/dashboard" handleSideBarCllick={() => { navigate('/admin/dashboard') }}/>
        <SideBarItem icon={PersonOutlineOutlinedIcon} title='Quản Lý Tài Khoản' to="/admin/account" handleSideBarCllick={() => { navigate('/admin/account') }}/>
        <SideBarItem icon={ShoppingBagOutlinedIcon} title='Quản Lý Sản Phẩm' to="/admin/product" handleSideBarCllick={() => { navigate('/admin/product') }}/>
        <SideBarItem icon={ListAltOutlinedIcon} title='Quản Lý Danh Mục' to="/admin/category" handleSideBarCllick={() => { navigate('/admin/category') }}/>
        <SideBarItem icon={ShoppingCartOutlinedIcon} title='Quản Lý Đơn Hàng' to="/admin/order" handleSideBarCllick={() => { navigate('/admin/order') }}/>
        <SideBarItem icon={DiscountOutlinedIcon} title='Quản Lý Khuyến Mãi' to="/admin/promotion" handleSideBarCllick={() => { navigate('/admin/promotion') }}/>
        <SideBarItem icon={RateReviewOutlinedIcon} title='Quản Lý Đánh Giá' to="/admin/rating" handleSideBarCllick={() => { navigate('/admin/rating') }}/>
        <SideBarItem icon={PeopleAltOutlinedIcon} title='Quản Lý Khách Hàng' to="/admin/customer" handleSideBarCllick={() => { navigate('/admin/product') }}/>
        <SideBarItem icon={GroupsOutlinedIcon} title='Quản Lý Nhân Viên' to="/admin/employee" handleSideBarCllick={() => { navigate('/admin/employee') }}/>
        <SideBarItem icon={StoreOutlinedIcon} title='Quản Lý Chi Nhánh' to="/admin/store" handleSideBarCllick={() => { navigate('/admin/product') }}/>
      </Box>
    </Box>
  )
}

export default SideBar
