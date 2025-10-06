import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Snackbar from '@mui/material/Snackbar'
import Chip from '@mui/material/Chip'

import { fetchAllCustomersAPI, deleteCustomerAPI, searchCustomersAPI } from '~/apis/customerAPIs'
import TablePageControls from '../TablePageControls/TablePageControls'
import TableRowsPerPage from '../TableRowsPerPage/TableRowsPerPage'

const TableCustomer = ({ onEditCustomer }) => {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [deletingCustomerId, setDeletingCustomerId] = useState(null)
  const [rows, setRows] = useState([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const [searchQuery, setSearchQuery] = useState('')

  // Hook debounce để giảm số lần gọi API
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      return () => clearTimeout(handler)
    }, [value, delay])
    return debouncedValue
  }
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        let data
        if (!debouncedSearchQuery) {
          data = await fetchAllCustomersAPI()
        } else {
          data = await searchCustomersAPI(debouncedSearchQuery)
        }
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setRows(sortedData)
      } catch {
        setRows([])
        setSnackbarMessage('Không thể tải dữ liệu khách hàng. Vui lòng thử lại.')
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
      }
    }
    fetchCustomers()
  }, [debouncedSearchQuery])

  const handleEdit = (id) => {
    onEditCustomer(id)
  }

  const handleDelete = (id) => {
    setDeletingCustomerId(id)
    setOpenDeleteConfirm(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteCustomerAPI(deletingCustomerId)
      setRows(rows.filter((c) => c._id !== deletingCustomerId))

      setSnackbarMessage('Khách hàng đã được xóa thành công!')
      setSnackbarSeverity('success')
    } catch {
      setSnackbarMessage('Lỗi khi xóa khách hàng. Vui lòng thử lại.')
      setSnackbarSeverity('error')
    } finally {
      setOpenSnackbar(true)
      setOpenDeleteConfirm(false)
      setDeletingCustomerId(null)
    }
  }

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false)
    setDeletingCustomerId(null)
  }

  const handleCloseSnackbar = (_, reason) => {
    if (reason !== 'clickaway') {
      setOpenSnackbar(false)
    }
  }

  const truncate = (text = '', maxLength = 50) =>
    text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('vi-VN')
    } catch {
      return ''
    }
  }

  const tierColor = (tier) => {
    switch (tier) {
      case 'Platinum':
        return 'default'
      case 'Gold':
        return 'warning'
      case 'Silver':
        return 'info'
      default:
        return 'success'
    }
  }

  return (
    <>
      <TableRowsPerPage
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 100]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflowX: 'auto'
        }}
      >
        <Table sx={{ minWidth: 1000 }} aria-label="customer table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>STT</strong></TableCell>
              <TableCell><strong>KHÁCH HÀNG</strong></TableCell>
              <TableCell><strong>SỐ ĐIỆN THOẠI</strong></TableCell>
              <TableCell><strong>EMAIL</strong></TableCell>
              <TableCell><strong>HẠNG</strong></TableCell>
              <TableCell><strong>ĐỊA CHỈ</strong></TableCell>
              <TableCell><strong>GHI CHÚ</strong></TableCell>
              <TableCell><strong>NGÀY TẠO</strong></TableCell>
              <TableCell align="center"><strong>THAO TÁC</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow
                key={row._id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#fafafa' }
                }}
              >
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>

                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={row.avatar}
                      alt={row.name}
                      sx={{ width: 48, height: 48, mr: 2 }}
                      variant="circular"
                    />
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {row.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        #{row.code || row._id?.slice(-6)}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell sx={{ maxWidth: 150 }}>
                  <Typography variant="body2">
                    {row.phone}
                  </Typography>
                </TableCell>

                <TableCell sx={{ maxWidth: 220 }}>
                  <Typography variant="body2">{row.email}</Typography>
                </TableCell>

                <TableCell>
                  <Chip size="small" label={row.tier || 'Member'} color={tierColor(row.tier)} />
                </TableCell>

                <TableCell sx={{ maxWidth: 220 }}>
                  <Tooltip title={row.address} placement="top-start">
                    <Typography variant="body2">
                      {truncate(row.address || '')}
                    </Typography>
                  </Tooltip>
                </TableCell>

                <TableCell sx={{ maxWidth: 240 }}>
                  <Tooltip title={row.notes} placement="top-start">
                    <Typography variant="body2">
                      {truncate(row.notes || '')}
                    </Typography>
                  </Tooltip>
                </TableCell>

                <TableCell>
                  <Typography variant="body2">{formatDate(row.createdAt)}</Typography>
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Tooltip title="Sửa khách hàng">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(row._id)}
                        sx={{
                          width: 46,
                          height: 46,
                          minWidth: 32,
                          padding: 0,
                          borderRadius: 1,
                          backgroundColor: '#e8f5e8',
                          '&:hover': { backgroundColor: '#c8e6c9' }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Xóa khách hàng">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(row._id)}
                        sx={{
                          width: 46,
                          height: 46,
                          minWidth: 32,
                          padding: 0,
                          borderRadius: 1,
                          backgroundColor: '#ffebee',
                          '&:hover': { backgroundColor: '#ffcdd2' }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePageControls
        page={page}
        rowsPerPage={rowsPerPage}
        count={rows.length}
        onChangePage={handleChangePage}
      />

      <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa khách hàng này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

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
    </>
  )
}

export default TableCustomer
