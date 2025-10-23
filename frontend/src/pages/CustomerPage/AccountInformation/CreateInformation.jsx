import { Box, TextField, Button, FormLabel } from '@mui/material'
import { useState } from 'react'
import { updateUserAPI } from '~/apis/userAPIs'

function CreateInformation() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('accessToken')

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  })

  const [errors, setErrors] = useState({ email: '', phone: '' })

  const handleLogout = () => {
    const userStr = localStorage.getItem('user')
    const user = JSON.parse(userStr)
    const id = user._id
    navigator.sendBeacon(`http://localhost:8017/v1/user/logout/${id}`, null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    sessionStorage.removeItem('visitedcustomer')
    window.location.href = '/login'
  }

  const validate = (data = form) => {
    const nextErrors = { email: '', phone: '' }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!data.email) nextErrors.email = 'Email là bắt buộc'
    else if (!emailRegex.test(data.email)) nextErrors.email = 'Email không hợp lệ (phải có @ và tên miền)'
    const phoneRegex = /^\d{10}$/
    if (!data.phone) nextErrors.phone = 'Số điện thoại là bắt buộc'
    else if (!phoneRegex.test(data.phone)) nextErrors.phone = 'Số điện thoại phải gồm đúng 10 chữ số'
    setErrors(nextErrors)
    return !nextErrors.email && !nextErrors.phone
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const onlyDigits = value.replace(/\D/g, '').slice(0, 10)
      const nextForm = { ...form, phone: onlyDigits }
      setForm(nextForm)
      validate(nextForm)
      return
    }

    const nextForm = { ...form, [name]: value }
    setForm(nextForm)
    validate(nextForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const updateData = {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address
      }

      const updatedUser = await updateUserAPI(updateData, token)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      alert('Cập nhật thông tin thành công!')
    } catch (error) {
      alert(error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin')
    }
  }

  return (
    <Box
      sx={{
        backgroundImage: 'url("https://cdn.pnj.io/images/2023/relayout-pdp/Frame%2055883.png")',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          maxWidth: 600,
          mx: 'auto',
          my: 3,
          p: '25px 50px 30px 50px',
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 4
        }}
      >
        <FormLabel sx={{ display: 'flex', justifyContent: 'center', fontSize: '28px', color: '#0c3860', mb: 2 }}>
          Cập nhật thông tin
        </FormLabel>

        <TextField
          fullWidth
          margin="normal"
          label="Họ và tên"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Số điện thoại"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          required
          inputProps={{ inputMode: 'numeric', pattern: '\\d*', maxLength: 10 }}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Địa chỉ"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, bgcolor: '#4a3aff', borderRadius: '8px', py: 1.5, fontWeight: 'bold', fontSize: '16px' }}
        >
          Hoàn tất
        </Button>

        <Button
          fullWidth
          type="button"
          variant="contained"
          onClick={handleLogout}
          sx={{ mt: 3, bgcolor: '#d32f2f', borderRadius: '8px', py: 1.5, fontWeight: 'bold', fontSize: '16px' }}
        >
          Đăng xuất
        </Button>
      </Box>
    </Box>
  )
}

export default CreateInformation
