import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Snackbar, Alert, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Stack, Divider, CircularProgress, TextField, TablePagination,
  FormControl, Select, MenuItem
} from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import {
  fetchCustomersAPI,
  searchCustomersAPI,
  getCustomerSummaryAPI,
  getCustomerOrdersAPI
} from '~/apis/customerAPIs'

const formatVND = (n) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(n) || 0)

const TableCustomer = () => {
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' })
  const token = localStorage.getItem('accessToken')

  // Dialog state
  const [openDetail, setOpenDetail] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [detailUser, setDetailUser] = useState(null)
  const [detailStats, setDetailStats] = useState({ totalOrders: 0, totalAmount: 0, tier: 'Standard' })
  const [detailOrders, setDetailOrders] = useState([])

  // Debounce
  const useDebounce = (value, delay) => {
    const [debounced, setDebounced] = useState(value)
    useEffect(() => {
      const h = setTimeout(() => setDebounced(value), delay)
      return () => clearTimeout(h)
    }, [value, delay])
    return debounced
  }
  const debounced = useDebounce(searchQuery, 300)

  // Fetch list
  useEffect(() => {
    (async () => {
      try {
        const data = debounced ? await searchCustomersAPI(debounced, token) : await fetchCustomersAPI(token)
        const filtered = (data || []).map(u => ({
          _id: u._id,
          name: u.fullName || u.name || '',
          email: u.email || '',
          phone: u.phone || '',
          address: u.address || '',
          role: u.role || 'customer'
        }))
        setRows(filtered)
      } catch {
        setRows([])
        setSnack({ open: true, message: 'Không thể tải danh sách khách hàng.', severity: 'error' })
      }
    })()
  }, [debounced])

  // Open detail dialog
  const handleOpenDetail = async (id) => {
    setOpenDetail(true)
    setLoadingDetail(true)
    try {
      // 1) profile + stats
      const summary = await getCustomerSummaryAPI(id, token) // { user, stats }
      setDetailUser(summary?.user || null)
      let stats = summary?.stats || { totalOrders: 0, totalAmount: 0, tier: 'Standard' }

      // 2) orders (filter by userId for sure)
      try {
        const ordersRaw = await getCustomerOrdersAPI(id, token)
        const orders = Array.isArray(ordersRaw) ? ordersRaw : []
        const filtered = orders.filter(o => {
          const uid = o.userId || o.user || o.user?._id || o.userId?._id
          return String(uid) === String(id)
        })
        setDetailOrders(filtered)

        // 3) recompute stats for UI consistency
        const totalOrders = filtered.length
        const totalAmount = filtered.reduce((s, o) => s + Number(o?.total || 0), 0)
        stats = { ...stats, totalOrders, totalAmount }
      } catch {
        setDetailOrders([])
        setSnack({ open: true, message: 'Không tải được danh sách đơn hàng của khách.', severity: 'warning' })
      }
      setDetailStats(stats)
    } catch {
      setDetailUser(null)
      setDetailStats({ totalOrders: 0, totalAmount: 0, tier: 'Standard' })
      setDetailOrders([])
      setSnack({ open: true, message: 'Không thể tải chi tiết khách hàng.', severity: 'error' })
    } finally {
      setLoadingDetail(false)
    }
  }
  const handleCloseDetail = () => setOpenDetail(false)

  // Pagination helpers
  const handleChangePage = (_, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }

  return (
    <>
      {/* Header controls: Số hàng mỗi trang + Search (giống các trang khác) */}
      <Box sx={{ color:'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">Số khách mỗi trang:</Typography>
          <FormControl
            variant="standard"
            sx={{
              minWidth: 72,
              // chữ và icon trắng
              '& .MuiInputBase-root': { color: '#fff' },
              '& .MuiSvgIcon-root': { color: '#fff' },
              // gạch chân trắng (trước, hover, sau)
              '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.6)' },
              '& .MuiInput-underline:hover:before': { borderBottomColor: '#fff' },
              '& .MuiInput-underline:after': { borderBottomColor: '#fff' }
            }}
          >
            <Select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(0) }}
              // làm nền trong suốt cho phần hiển thị
              sx={{ '& .MuiSelect-select': { backgroundColor: 'transparent' } }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ color:'white', display: 'flex', alignItems: 'center', gap: 1, minWidth: 320 }}>
          <Typography variant="body2">Search:</Typography>
          <TextField
            fullWidth
            size="small"
            variant="standard"
            placeholder="Tìm theo tên hoặc email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              sx: {
                color: '#fff',
                '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.7)' },
                '&:before,&:after': { borderBottomColor: 'rgba(255,255,255,0.6)' },
                '&:hover:not(.Mui-disabled):before': { borderBottomColor: '#fff' }
              }
            }}
          />
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2, mt: 1 }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ width: 60 }}>STT</TableCell>
              <TableCell>HỌ TÊN</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>SỐ ĐIỆN THOẠI</TableCell>
              <TableCell>ĐỊA CHỈ</TableCell>
              <TableCell align="center" sx={{ width: 160 }}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
              <TableRow key={row._id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                <TableCell><Typography variant='body2'>{row.name}</Typography></TableCell>
                <TableCell><Typography variant='body2'>{row.email}</Typography></TableCell>
                <TableCell><Typography variant='body2'>{row.phone}</Typography></TableCell>
                <TableCell><Typography variant='body2'>{row.address}</Typography></TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    startIcon={<VisibilityOutlinedIcon />}
                    onClick={() => handleOpenDetail(row._id)}
                    sx={{ textTransform: 'none' }}
                  >
                    Xem chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">Không có dữ liệu</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Phân trang dưới bảng */}
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 100]}
        />
      </TableContainer>

      {/* =============== DIALOG CHI TIẾT KHÁCH HÀNG =============== */}
      <Dialog open={openDetail} onClose={handleCloseDetail} maxWidth="md" fullWidth>
        <DialogTitle>Chi tiết khách hàng</DialogTitle>
        <DialogContent dividers>
          {loadingDetail ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Thông tin khách (mỗi thông tin 1 dòng) */}
              <Stack spacing={1.25} sx={{ mb: 2 }}>
                <OneLine label="Họ và tên" value={detailUser?.fullName || detailUser?.name || '—'} />
                <OneLine label="Email" value={detailUser?.email || '—'} required />
                <OneLine label="Số điện thoại" value={detailUser?.phone || '—'} />
                <OneLine label="Địa chỉ" value={detailUser?.address || '—'} />
                <OneLine label="Vai trò" value={detailUser?.role || 'customer'} />
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              {/* Thống kê */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <StatBox title="Tổng số đơn hàng" value={detailStats.totalOrders} />
                <StatBox title="Tổng giá trị đơn hàng" value={formatVND(detailStats.totalAmount)} />
                <StatBox title="Hạng thẻ khách hàng" value={detailStats.tier} />
              </Box>

              {/* Danh sách đơn hàng */}
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>Đơn hàng của khách</Typography>
              <TableContainer component={Paper} sx={{ borderRadius: 1, boxShadow: 0 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Mã đơn</TableCell>
                      <TableCell>Ngày tạo</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell align="right">Tổng tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailOrders.map((o, i) => (
                      <TableRow key={o._id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{o.code || o._id}</TableCell>
                        <TableCell>{o.createdAt ? new Date(o.createdAt).toLocaleString('vi-VN') : ''}</TableCell>
                        <TableCell>{o.status || '—'}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: 'error.main' }}>
                          {formatVND(o.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {detailOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} align="center">Chưa có đơn hàng</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetail} variant="outlined">Đóng</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={5000}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: '46px' }}
      >
        <Alert onClose={() => setSnack(s => ({ ...s, open: false }))} severity={snack.severity} variant="filled" sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  )
}

/** Sub components **/
const OneLine = ({ label, value, required = false }) => (
  <Box>
    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'inline' }}>
      {label}
    </Typography>
    {required && <Typography component="span" color="error.main" sx={{ ml: 0.5 }}>*</Typography>}
    <Typography variant="body1">{value}</Typography>
  </Box>
)

const StatBox = ({ title, value }) => (
  <Box sx={{ p: 1.25, borderRadius: 1, border: '1px solid #eee', minWidth: 220 }}>
    <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
    <Typography variant="h6">{value}</Typography>
  </Box>
)

export default TableCustomer
