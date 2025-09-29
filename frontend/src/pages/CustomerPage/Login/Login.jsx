import React, { useState } from 'react'
import {
  Box, Typography, Button,
  Snackbar, Alert, CircularProgress,
  IconButton, InputAdornment
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import FieldCustom from '~/components/admin/FieldCustom/FieldCustom'
import { loginUserAPI } from '~/apis/userAPIs'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return
    setOpenSnackbar(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      setSnackbarMessage('Vui lòng nhập email và mật khẩu!')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setSnackbarMessage('Email không hợp lệ!')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
      return
    }

    setLoading(true)
    try {
      const res = await loginUserAPI(form)

      if (res.token) {
        localStorage.setItem('accessToken', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
      }

      // ✅ Kiểm tra role
      const role = res.user?.role
      setSnackbarMessage('Đăng nhập thành công!')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)

      setTimeout(() => {
        if (role === 'admin') {
          navigate('/admin')
        } else if (role === 'customer') {
          navigate('/customer')
        } else {
          navigate('/')
        }
      }, 800)
    } catch (err) {
      const msg = err.response?.data?.message || 'Đăng nhập thất bại, vui lòng thử lại!'
      setSnackbarMessage(msg)
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: 500,
          backgroundColor: '#343a40',
          px: 4,
          py: 3,
          borderRadius: '16px',
          boxShadow: 3
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="white"
          sx={{ textAlign: 'center', mb: 2 }}
        >
          Đăng nhập
        </Typography>

        <form onSubmit={handleSubmit}>
          <FieldCustom
            label="Email"
            required
            placeholder="Nhập email..."
            name="email"
            value={form.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <FieldCustom
            label="Mật khẩu"
            required
            placeholder="Nhập mật khẩu..."
            name="password"
            value={form.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(prev => !prev)}
                    edge="end"
                    sx={{ color: 'white' }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 1,
              backgroundColor: '#0d6efd',
              '&:hover': { backgroundColor: '#0b5ed7' },
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : 'Đăng nhập'}
          </Button>
        </form>

        <Typography
          variant="body2"
          color="white"
          sx={{ mt: 2, textAlign: 'center' }}
        >
          Chưa có tài khoản?{' '}
          <a href="/" style={{ color: '#0d6efd' }}>
            Đăng ký
          </a>
        </Typography>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ marginTop: '46px' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Login
