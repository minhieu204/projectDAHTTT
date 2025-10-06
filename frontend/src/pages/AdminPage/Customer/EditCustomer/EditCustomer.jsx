import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, Snackbar, Alert, CircularProgress } from '@mui/material'
import FieldCustom from '~/components/admin/FieldCustom/FieldCustom'
import ImageUpload from '~/components/admin/ImageUpload/ImageUpload'
import { getCustomerDetailAPI, uploadImageToCloudinaryAPI, updateCustomerAPI } from '~/apis/customerAPIs'
import { useNavigate, useParams } from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save'

function EditCustomer() {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { customerId } = useParams()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    tier: 'Member',
    notes: '',
    avatar: null,
    currentAvatarUrl: null
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const c = await getCustomerDetailAPI(customerId)
        setFormData({
          name: c.name || '',
          phone: c.phone || '',
          email: c.email || '',
          address: c.address || '',
          tier: c.tier || 'Member',
          notes: c.notes || '',
          avatar: null,
          currentAvatarUrl: c.avatar || null
        })
      } catch {
        setSnackbarMessage('Không thể lấy thông tin khách hàng. Vui lòng thử lại!')
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
      } finally {
        setLoading(false)
      }
    }
    if (customerId) fetchData()
  }, [customerId])

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return
    setOpenSnackbar(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
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
      avatar: !formData.avatar && !formData.currentAvatarUrl ? 'Vui lòng chọn một ảnh.' : ''
    }

    setErrors(tempErrors)
    return Object.values(tempErrors).every((x) => x === '')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      let avatarUrl = formData.currentAvatarUrl
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

      await updateCustomerAPI(customerId, payload)

      setSnackbarMessage('Khách hàng đã được cập nhật thành công!')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)

      setTimeout(() => {
        navigate('/admin/customer')
      }, 800)

      setErrors({})
    } catch {
      setSnackbarMessage('Có lỗi xảy ra khi cập nhật khách hàng. Vui lòng thử lại!')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
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
        <Typography variant="h5">Chỉnh sửa khách hàng</Typography>
      </Box>
      <Box sx={{ px: 6 }} component="form" onSubmit={handleSubmit}>
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
          currentImageUrl={formData.currentAvatarUrl}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              my: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textTransform: 'none',
              fontSize: '18px'
            }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : <SaveIcon />}
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ marginTop: '46px' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default EditCustomer
