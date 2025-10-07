import React, { useEffect, useMemo, useState } from 'react'
import { Box, Typography, Paper, Stack } from '@mui/material'
import TableCustomer from '~/components/admin/TableCustomer/TableCustomer.jsx'
import { fetchCustomerInsightsAPI } from '~/apis/customerAPIs'

const currencyVN = (n = 0) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n)

function Customer() {
  const [insights, setInsights] = useState([])

  useEffect(() => {
    const run = async () => setInsights(await fetchCustomerInsightsAPI())
    run()
  }, [])

  const totals = useMemo(() => {
    const customers = insights.length
    const orders = insights.reduce((s, x) => s + (x.totalOrders || 0), 0)
    const amount = insights.reduce((s, x) => s + (x.totalAmount || 0), 0)
    return { customers, orders, amount }
  }, [insights])

  return (
    <Box sx={{ backgroundColor: '#343a40', mx: 5, my: 1, borderRadius: '8px', overflow: 'auto' }}>
      <Box sx={{ color: 'white', m: '16px 48px 16px 16px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Khách hàng (theo Account)</Typography>
      </Box>

      {/* Summary cards */}
      <Box sx={{ px: 6, pb: 1 }}>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2, minWidth: 220 }}>
            <Typography variant="body2" color="text.secondary">Tổng khách</Typography>
            <Typography variant="h5">{totals.customers}</Typography>
          </Paper>
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2, minWidth: 220 }}>
            <Typography variant="body2" color="text.secondary">Tổng đơn hàng</Typography>
            <Typography variant="h5">{totals.orders}</Typography>
          </Paper>
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2, minWidth: 220 }}>
            <Typography variant="body2" color="text.secondary">Tổng doanh thu</Typography>
            <Typography variant="h5">{currencyVN(totals.amount)}</Typography>
          </Paper>
        </Stack>
      </Box>

      {/* Bảng khách hàng */}
      <Box sx={{ px: 6, pb: 3 }}>
        <TableCustomer />
      </Box>
    </Box>
  )
}

export default Customer
