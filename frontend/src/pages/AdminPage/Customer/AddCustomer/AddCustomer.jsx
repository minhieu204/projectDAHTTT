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
  createCustomerAPI,
  uploadImageToCloudinaryAPI
} from '~/apis/customerAPIs'

function AddCustomer() {
  const navigate = useNavigate()

  // State dữ liệu form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    tier: 'Member',
    notes: '',
    avatar: null
  })

  // State lỗi validation
  const [errors, setErrors] = useState({})

  // State Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleCloseSnackbar = (_, reason) => {
    if (reason !== 'clickaway') {
      setSnackbar((prev) => ({ ...prev, open: false }))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleImageChange = (file) => {
    setFormData((prev) => ({ ...prev, avatar: file }))
    setErrors((prev) => ({ ...prev, avatar: '' }))
  }

  const validate = () => {
    const phoneRegex = /^(0|\+84)(\d{9,10})$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const tempErrors = {
      name: formData.name ? '' : 'Vui lòng nhập tên khách hàng.',
      phone: phoneRegex.test(formData.phone) ? '' : 'Số điện thoại không hợp lệ.',
      email: formData.email ? (emailRegex.test(formData.email) ? '' : 'Email không hợp lệ.') : '',
      address: formData.address ? '' : 'Vui lòng nhập địa chỉ.',
      tier: formData.tier ? '' : 'Vui lòng chọn hạng khách hàng.',
      notes: '',
      avatar: formData.avatar ? '' : 'Vui lòng chọn ảnh đại diện.'
    }

    setErrors(tempErrors)
    return Object.values(tempErrors).every((x) => x === '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      let avatarUrl = null
      if (formData.avatar) {
        const uploadResponse = await uploadImageToCloudinaryAPI(formData.avatar)
        avatarUrl = uploadResponse.secure_url
      }

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        tier: formData.tier,
        notes: formData.notes.trim(),
        avatar: avatarUrl
      }

      await createCustomerAPI(payload)

      setSnackbar({
        open: true,
        message: 'Khách hàng đã được thêm thành công!',
        severity: 'success'
      })

      setTimeout(() => navigate('/admin/customer'), 500)
      setErrors({})
    } catch {
      setSnackbar({
        open: true,
        message: 'Có lỗi xảy ra khi thêm khách hàng. Vui lòng thử lại!',
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
      <Box
        sx={{
          color: 'white',
          m: '16px 48px 16px 16px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5">Thêm khách hàng</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ px: 6 }}>
        <FieldCustom
          label="Tên khách hàng"
          required
          placeholder="Nhập tên khách hàng..."
          value={formData.name}
          onChange={handleChange}
          name="name"
          error={!!errors.name}
          helperText={errors.name}
        />
        <FieldCustom
          label="Số điện thoại"
          required
          placeholder="Nhập số điện thoại..."
          value={formData.phone}
          onChange={handleChange}
          name="phone"
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <FieldCustom
          label="Email"
          placeholder="Nhập email..."
          value={formData.email}
          onChange={handleChange}
          name="email"
          error={!!errors.email}
          helperText={errors.email}
        />
        <FieldCustom
          label="Địa chỉ"
          required
          placeholder="Nhập địa chỉ..."
          value={formData.address}
          onChange={handleChange}
          name="address"
          error={!!errors.address}
          helperText={errors.address}
        />
        <FieldCustom
          label="Hạng khách hàng"
          required
          options={[
            { value: 'Member', label: 'Member' },
            { value: 'Silver', label: 'Silver' },
            { value: 'Gold', label: 'Gold' },
            { value: 'Platinum', label: 'Platinum' }
          ]}
          value={formData.tier}
          onChange={handleChange}
          name="tier"
          error={!!errors.tier}
          helperText={errors.tier}
        />
        <FieldCustom
          label="Ghi chú"
          multiline
          rows={3}
          placeholder="Ghi chú thêm..."
          value={formData.notes}
          onChange={handleChange}
          name="notes"
          error={!!errors.notes}
          helperText={errors.notes}
        />
        <ImageUpload
          label="Ảnh đại diện"
          required
          onImageChange={handleImageChange}
          error={!!errors.avatar}
          helperText={errors.avatar}
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
            Thêm khách hàng
          </Button>
        </Box>
      </Box>

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

export default AddCustomer
