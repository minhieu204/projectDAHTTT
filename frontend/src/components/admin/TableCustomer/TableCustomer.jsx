import React, { useEffect, useMemo, useState } from 'react'
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Typography, Tooltip, Chip, TextField, InputAdornment, TablePagination,
  Drawer, Divider, Stack
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { fetchCustomerInsightsAPI } from '~/apis/customerAPIs.js'

const currencyVN = (n = 0) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n)

const tierColor = (tier) => {
  switch (tier) {
  case 'Platinum': return 'default'
  case 'Gold': return 'warning'
  case 'Silver': return 'info'
  default: return 'success'
  }
}

function TableCustomer() {
  const [rows, setRows] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [openDetail, setOpenDetail] = useState(false)
  const [current, setCurrent] = useState(null)

  // Debounce
  const useDebounce = (v, d) => {
    const [val, setVal] = useState(v)
    useEffect(() => { const t = setTimeout(() => setVal(v), d); return () => clearTimeout(t) }, [v, d])
    return val
  }
  const q = useDebounce(query, 250)

  useEffect(() => {
    const load = async () => {
      const data = await fetchCustomerInsightsAPI()
      // Mặc định sort theo tổng tiền giảm dần
      setRows(data.sort((a, b) => (b.totalAmount || 0) - (a.totalAmount || 0)))
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase()
    if (!kw) return rows
    return rows.filter(r => (`${r.name} ${r.phone} ${r.email} ${r.address}`).toLowerCase().includes(kw))
  }, [rows, q])

  const openDrawer = (row) => { setCurrent(row); setOpenDetail(true) }
  const closeDrawer = () => setOpenDetail(false)

  const handleChangePage = (_e, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }

  return (
    <>
      {/* search + counter */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          placeholder="Tìm theo tên / SĐT / email / địa chỉ..."
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: 420, background: '#fff', borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            )
          }}
        />
        <Typography variant="body2" color="text.secondary">
          Tổng khách: <b>{filtered.length}</b>
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,.1)' }}>
        <Table sx={{ minWidth: 1100 }}>
          <TableHead>
            <TableRow sx={{ background: '#f5f5f5' }}>
              <TableCell><strong>STT</strong></TableCell>
              <TableCell><strong>KHÁCH HÀNG</strong></TableCell>
              <TableCell><strong>SĐT</strong></TableCell>
              <TableCell><strong>EMAIL</strong></TableCell>
              <TableCell><strong>ĐỊA CHỈ</strong></TableCell>
              <TableCell align="right"><strong>TỔNG ĐƠN</strong></TableCell>
              <TableCell align="right"><strong>TỔNG TIỀN</strong></TableCell>
              <TableCell><strong>HẠNG</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
              <TableRow key={row._id} hover onClick={() => openDrawer(row)} sx={{ cursor: 'pointer' }}>
                <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar src={row.avatar} alt={row.name} sx={{ width: 44, height: 44 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{row.name}</Typography>
                      <Typography variant="caption" color="text.secondary">#{String(row._id).slice(-6)}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell sx={{ maxWidth: 260 }}>
                  <Tooltip title={row.address || ''}><span>{row.address}</span></Tooltip>
                </TableCell>
                <TableCell align="right">{row.totalOrders}</TableCell>
                <TableCell align="right">{currencyVN(row.totalAmount)}</TableCell>
                <TableCell>
                  <Chip size="small" label={row.tier || 'Member'} color={tierColor(row.tier)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 100]}
        sx={{ mt: 1 }}
      />

      {/* Drawer thông tin khách */}
      <Drawer
        anchor="right"
        open={openDetail}
        onClose={closeDrawer}
        PaperProps={{ sx: { width: 380 } }}
      >
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={current?.avatar} sx={{ width: 64, height: 64 }} />
            <Box>
              <Typography variant="h6">{current?.name}</Typography>
              <Chip size="small" label={current?.tier || 'Member'} color={tierColor(current?.tier)} />
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />
          <Stack spacing={1}>
            <Typography variant="body2"><b>Điện thoại:</b> {current?.phone || '—'}</Typography>
            <Typography variant="body2"><b>Email:</b> {current?.email || '—'}</Typography>
            <Typography variant="body2"><b>Địa chỉ:</b> {current?.address || '—'}</Typography>
            <Typography variant="body2"><b>Tổng đơn:</b> {current?.totalOrders ?? 0}</Typography>
            <Typography variant="body2"><b>Tổng tiền:</b> {currencyVN(current?.totalAmount || 0)}</Typography>
            <Typography variant="body2"><b>Mã KH:</b> {String(current?._id || '').slice(-24)}</Typography>
          </Stack>
        </Box>
      </Drawer>
    </>
  )
}

export default TableCustomer
