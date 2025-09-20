import React, { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { useNavigate } from 'react-router-dom'

import FieldCustom from '~/components/admin/FieldCustom/FieldCustom'
import ImageUpload from '~/components/admin/ImageUpload/ImageUpload'
import {
  createCategoryAPI
} from '~/apis/categoryAPIs'

function AddCategory() {
  const navigate = useNavigate()

  // State dữ liệu form
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    material: '',
    quantity: '',
    description: '',
    image: null
  })

  // State lỗi validation
  const [errors, setErrors] = useState({})

  // State Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // Hàm đóng Snackbar
  const handleCloseSnackbar = (_, reason) => {
    if (reason !== 'clickaway') {
      setSnackbar((prev) => ({ ...prev, open: false }))
    }
  }

  // Xử lý thay đổi input text
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }


  // Validate dữ liệu
  const validate = () => {
    const tempErrors = {
      name: formData.name ? '' : 'Vui lòng nhập tên danh mục.',
    }

    setErrors(tempErrors)
    return Object.values(tempErrors).every((x) => x === '')
  }

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const categoryData = {
        name: formData.name,
      }

      await createCategoryAPI(categoryData)

      setSnackbar({
        open: true,
        message: 'Danh mục đã được thêm thành công!',
        severity: 'success'
      })

      setTimeout(() => navigate('/admin/category'), 500)
      setErrors({})
    } catch {
      setSnackbar({
        open: true,
        message: 'Có lỗi xảy ra khi thêm danh mục. Vui lòng thử lại!',
        severity: 'error'
      })
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: '#343a40',
        mx: 5,
        my: 1,
        borderRadius: '8px',
        overflow: 'auto'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          color: 'white',
          m: '16px 48px 16px 16px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5">Thêm danh mục</Typography>
      </Box>

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ px: 6 }}>
        <FieldCustom
          label="Tên danh mục"
          required
          placeholder="Nhập tên danh mục..."
          value={formData.name}
          onChange={handleChange}
          name="name"
          error={!!errors.name}
          helperText={errors.name}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            sx={{
              my: 2,
              gap: 1,
              textTransform: 'none',
              fontSize: '18px'
            }}
          >
            Thêm danh mục
          </Button>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: '46px' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AddCategory
