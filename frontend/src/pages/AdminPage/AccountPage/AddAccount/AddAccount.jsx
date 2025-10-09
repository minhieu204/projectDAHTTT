// src/pages/CustomerDetail.jsx
import React, { useEffect, useState } from 'react'
import {
  Box, Card, CardContent, Grid, Typography,
  CircularProgress, Alert
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { getCustomerSummaryAPI } from '~/apis/customerAPIs'
import FieldCustom from '~/components/admin/FieldCustom/FieldCustom'

const formatVND = (n) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n || 0)

function CustomerDetail() {
  const { id } = useParams()
  const token = localStorage.getItem('accessToken')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({ totalOrders: 0, totalAmount: 0, tier: 'Standard' })

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await getCustomerSummaryAPI(id, token) // { user, stats }
        setUser(res.user)
        setStats(res.stats)
      } catch {
        setError('Không thể tải thông tin khách hàng.')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ px: 6, py: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ backgroundColor: '#343a40', mx: 5, my: 1, borderRadius: '8px', color: 'white' }}>
      <Box sx={{ m: '16px 48px 16px 16px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Thông tin khách hàng</Typography>
      </Box>

      {/* ================== THÔNG TIN CÁ NHÂN: mỗi thông tin 1 dòng (giống form Account) ================== */}
      <Box sx={{ px: 6 }}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <FieldCustom
              label="Họ và tên"
              name="name"
              value={user?.fullName || user?.name || ''}
              disabled
            />
            <FieldCustom
              label="Email"
              name="email"
              value={user?.email || ''}
              required
              disabled
            />
            <FieldCustom
              label="Số điện thoại"
              name="phone"
              value={user?.phone || ''}
              disabled
            />
            <FieldCustom
              label="Địa chỉ"
              name="address"
              value={user?.address || ''}
              multiline
              rows={2}
              disabled
            />
            <FieldCustom
              label="Vai trò"
              name="role"
              value={user?.role || 'customer'}
              disabled
            />
          </CardContent>
        </Card>
      </Box>
      {/* ================================================================================================ */}

      {/* THỐNG KÊ MUA HÀNG */}
      <Box sx={{ px: 6, pb: 4, pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Tổng số đơn hàng</Typography>
                <Typography variant="h5">{stats.totalOrders}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Tổng giá trị đơn hàng</Typography>
                <Typography variant="h5">{formatVND(stats.totalAmount)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Hạng thẻ khách hàng</Typography>
                <Typography variant="h5">{stats.tier}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default CustomerDetail
