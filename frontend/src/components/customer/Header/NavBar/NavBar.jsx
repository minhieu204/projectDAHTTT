import { Box, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button'
import ListSubheader from '@mui/material/ListSubheader'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'


const StyledListHeader = styled(ListSubheader)({
  backgroundImage: 'var(--Paper-overlay)',
})

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [openModal, setOpenModel] = React.useState(false)
  const handleOpenModal = () => setOpenModel(true)
  const handleCloseModal = () => setOpenModel(false)
  const style = {
    position: 'absolute',
    top: '46%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '40px',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 3
        }}
      >
        <Box>
          <Button
            id="basic-button1"
            aria-controls={open ? 'grouped-menu1' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              color: '#696969',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'white'
              }
            }}
          >
            Nam
          </Button>
          <Menu
            id="grouped-menu1"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
                sx: {
                  width: '800px', // Đặt chiều rộng của menu để chứa các cột
                  py: 0,
                  display: 'flex', // Sử dụng flexbox để chia cột
                  padding: '20px', // Thêm padding cho menu
                },
              },
            }}
          >
            <Box sx={{ flex: '1 1 50%', pr: 2 }}>
              <StyledListHeader>Chủng loại</StyledListHeader>
              <MenuItem onClick={handleClose}>Nhẫn</MenuItem>
              <MenuItem onClick={handleClose}>Dây chuyền</MenuItem>
              <MenuItem onClick={handleClose}>Bông tai</MenuItem>
              <MenuItem onClick={handleClose}>Vòng tay</MenuItem>
              <MenuItem onClick={handleClose}>Kiềng</MenuItem>
              <MenuItem onClick={handleClose}>Vàng tài lộc</MenuItem>
            </Box>

            {/* Cột 2: Box chứa các mục */}
            <Box sx={{ flex: '1 1 50%' }}>
              <StyledListHeader>Chất liệu</StyledListHeader>
              <MenuItem onClick={handleClose}>Vàng</MenuItem>
              <MenuItem onClick={handleClose}>Bạc</MenuItem>
              <MenuItem onClick={handleClose}>Platinum</MenuItem>
            </Box>
          </Menu>
        </Box>
        <Box>
          <Button
            id="basic-button2"
            aria-controls={open ? 'grouped-menu2' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              color: '#696969',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'white'
              }
            }}
          >
            Nữ
          </Button>
          <Menu
            id="grouped-menu2"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
                sx: {
                  width: '800px', // Đặt chiều rộng của menu để chứa các cột
                  py: 0,
                  display: 'flex', // Sử dụng flexbox để chia cột
                  padding: '20px', // Thêm padding cho menu
                },
              },
            }}
          >
            <Box sx={{ flex: '1 1 50%', pr: 2 }}>
              <StyledListHeader>Chủng loại</StyledListHeader>
              <MenuItem onClick={handleClose}>Nhẫn</MenuItem>
              <MenuItem onClick={handleClose}>Dây chuyền</MenuItem>
              <MenuItem onClick={handleClose}>Bông tai</MenuItem>
              <MenuItem onClick={handleClose}>Vòng tay</MenuItem>
              <MenuItem onClick={handleClose}>Kiềng</MenuItem>
              <MenuItem onClick={handleClose}>Vàng tài lộc</MenuItem>
            </Box>

            {/* Cột 2: Box chứa các mục */}
            <Box sx={{ flex: '1 1 50%' }}>
              <StyledListHeader>Chất liệu</StyledListHeader>
              <MenuItem onClick={handleClose}>Vàng</MenuItem>
              <MenuItem onClick={handleClose}>Bạc</MenuItem>
              <MenuItem onClick={handleClose}>Platinum</MenuItem>
            </Box>
          </Menu>
        </Box>
        <Box>
          <Button
            id="basic-button3"
            aria-controls={open ? 'grouped-menu3' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              color: '#696969',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'white'
              }
            }}
          >
            Trẻ em
          </Button>
          <Menu
            id="grouped-menu3"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
                sx: {
                  width: '800px', // Đặt chiều rộng của menu để chứa các cột
                  py: 0,
                  display: 'flex', // Sử dụng flexbox để chia cột
                  padding: '20px', // Thêm padding cho menu
                },
              },
            }}
          >
            <Box sx={{ flex: '1 1 50%', pr: 2 }}>
              <StyledListHeader>Chủng loại</StyledListHeader>
              <MenuItem onClick={handleClose}>Nhẫn</MenuItem>
              <MenuItem onClick={handleClose}>Dây chuyền</MenuItem>
              <MenuItem onClick={handleClose}>Bông tai</MenuItem>
              <MenuItem onClick={handleClose}>Vòng tay</MenuItem>
              <MenuItem onClick={handleClose}>Kiềng</MenuItem>
              <MenuItem onClick={handleClose}>Vàng tài lộc</MenuItem>
            </Box>

            {/* Cột 2: Box chứa các mục */}
            <Box sx={{ flex: '1 1 50%' }}>
              <StyledListHeader>Chất liệu</StyledListHeader>
              <MenuItem onClick={handleClose}>Vàng</MenuItem>
              <MenuItem onClick={handleClose}>Bạc</MenuItem>
              <MenuItem onClick={handleClose}>Platinum</MenuItem>
            </Box>
          </Menu>
        </Box>
      </Box>
      <Box
      >
        <Button
          sx={{
            height: '35px',
            width: '350px',
            backgroundColor: '#F5F5F5',
            display: 'flex',
            justifyContent: 'space-between',
            color: '#696969',
            borderRadius: 6,
            textTransform: 'none',
            fontStyle: 'italic',
            '&:hover': {
              backgroundColor: '#F5F5F5'
            },
          }}
          onClick={handleOpenModal}
        >
          Tìm kiếm nhanh
          <SearchOutlinedIcon />
        </Button>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ m: 2 }}>
              <TextField
                id="outlined-search"
                label="Tìm kiếm nhanh"
                type="search"
                sx={{
                  '& .MuiInputBase-root': {
                    width: '864px'// Đặt chiều cao mong muốn
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                height: '500px',
                width: '100%',
                borderTop: '6px solid #696969',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img style={{ height: '360px' }} src="https://cdn.pnj.io/images/2025/rebuild/a60759ad1dabe909c46a817ecbf71878.png?1740973018637" alt="" />
              <Typography>
                Không tìm thấy kết quả
              </Typography>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}

export default NavBar
