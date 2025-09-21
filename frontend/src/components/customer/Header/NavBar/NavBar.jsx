import React, { useState, useEffect } from 'react'
import { Box, Button, Menu, MenuItem, ListSubheader, Modal, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { fetchAllCategorysAPI } from '~/apis/categoryAPIs' // API fetch danh mục từ backend

const StyledListHeader = styled(ListSubheader)({
  backgroundImage: 'var(--Paper-overlay)',
  fontWeight: 600
})

// Hàm chuyển mảng danh mục phẳng thành dạng cây
function buildCategoryTree(data) {
  const map = {}
  data.forEach((cat) => (map[cat._id] = { ...cat, children: [] }))
  const roots = []
  data.forEach((cat) => {
    if (cat.parentId) {
      map[cat.parentId]?.children.push(map[cat._id])
    } else {
      roots.push(map[cat._id])
    }
  })
  return roots
}

function NavBar() {
  const [_categories, setCategories] = useState([])
  const [categoryTree, setCategoryTree] = useState([])
  const [anchorEls, setAnchorEls] = useState({})
  const [openModal, setOpenModal] = useState(false)

  // Fetch danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchAllCategorysAPI() // trả về mảng danh mục
        setCategories(data)
        setCategoryTree(buildCategoryTree(data))
      } catch {
        //
      }
    }
    fetchCategories()
  }, [])

  const handleMenuOpen = (event, id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }))
  }

  const handleMenuClose = (id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: null }))
  }

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: 50, px: 4 }}>
      {/* ==== Menu Danh mục ==== */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {categoryTree.map((root) => (
          <Box key={root._id}>
            <Button
              aria-controls={anchorEls[root._id] ? `${root._id}-menu` : undefined}
              aria-haspopup="true"
              onClick={(e) => handleMenuOpen(e, root._id)}
              sx={{ color: '#696969', textTransform: 'none', '&:hover': { backgroundColor: 'white' } }}
            >
              {root.name}
            </Button>
            <Menu
              id={`${root._id}-menu`}
              anchorEl={anchorEls[root._id]}
              open={Boolean(anchorEls[root._id])}
              onClose={() => handleMenuClose(root._id)}
              slotProps={{
                list: { sx: { width: 800, py: 0, display: 'flex', padding: '20px' } }
              }}
            >
              {root.children.map((type) => (
                <Box key={type._id} sx={{ flex: 1, pr: 2 }}>
                  <StyledListHeader>{type.name}</StyledListHeader>
                  {type.children.map((material) => (
                    <MenuItem key={material._id} onClick={() => handleMenuClose(root._id)}>
                      {material.name}
                    </MenuItem>
                  ))}
                </Box>
              ))}
            </Menu>
          </Box>
        ))}
      </Box>

      {/* ==== Search nhanh ==== */}
      <Box>
        <Button
          onClick={() => setOpenModal(true)}
          sx={{
            height: 35,
            width: 350,
            backgroundColor: '#F5F5F5',
            color: '#696969',
            borderRadius: 6,
            textTransform: 'none',
            fontStyle: 'italic',
            display: 'flex',
            justifyContent: 'space-between',
            '&:hover': { backgroundColor: '#F5F5F5' }
          }}
        >
          Tìm kiếm nhanh
          <SearchOutlinedIcon />
        </Button>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={styleModal}>
            <TextField fullWidth label="Tìm kiếm nhanh" type="search" sx={{ mb: 2 }} />
            <Box
              sx={{
                height: 400,
                borderTop: '6px solid #696969',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                style={{ height: 200 }}
                src="https://cdn.pnj.io/images/2025/rebuild/a60759ad1dabe909c46a817ecbf71878.png"
                alt=""
              />
              <Typography>Không tìm thấy kết quả</Typography>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}

export default NavBar
