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
import { fetchAllProductsAPI, deleteProductAPI, searchProductsAPI } from '~/apis'
import Snackbar from '@mui/material/Snackbar'
import TablePageControls from '../../TablePageControls/TablePageControls'
import TableRowsPerPage from '../../TableRowsPerPage/TableRowsPerPage'


const TableProduct = () => {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [deletingProductId, setDeletingProductId] = useState(null)
  const [rows, setRows] = useState([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const [searchQuery, setSearchQuery] = useState('')

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])
    return debouncedValue
  }
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    if (!debouncedSearchQuery) {
      fetchAllProductsAPI().then((data) => {
        setRows(data)
      })
    } else {
      // Gọi API tìm kiếm với từ khóa đã debounce
      searchProductsAPI(debouncedSearchQuery).then((data) => {
        setRows(data)
      }).catch(error => {
        console.error('Lỗi khi tìm kiếm:', error)
        setRows([])
      })
    }
  }, [debouncedSearchQuery])

  // Định dạng tiền Việt Nam
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  // Hàm xử lý sự kiện
  const handleEdit = (id) => {
    console.log('Sửa sản phẩm với ID:', id)
    // Thêm logic edit ở đây
  }

  const handleDelete = (id) => {
    setDeletingProductId(id)
    setOpenDeleteConfirm(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteProductAPI(deletingProductId)

      // Cập nhật state để xóa sản phẩm khỏi bảng
      setRows(rows.filter(product => product._id !== deletingProductId))

      // Hiển thị thông báo thành công
      setSnackbarMessage('Sản phẩm đã được xóa thành công!')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)

    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error)
      // Hiển thị thông báo lỗi
      setSnackbarMessage('Lỗi khi xóa sản phẩm. Vui lòng thử lại.')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    } finally {
      // Luôn đóng dialog xác nhận, bất kể thành công hay thất bại
      setOpenDeleteConfirm(false)
      setDeletingProductId(null)
    }
  }

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false)
    setDeletingProductId(null)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }


  // Hàm cắt ngắn mô tả để hiển thị
  const truncateDescription = (description, maxLength = 50) => {
    if (description.length <= maxLength) return description
    return description.substring(0, maxLength) + '...'
  }

  // Hàm xử lý khi thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    // Tải dữ liệu cho trang mới
    // fetchProducts(newPage, rowsPerPage);
  }

  // Hàm xử lý khi thay đổi số hàng mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Quay về trang đầu tiên
    // Tải dữ liệu với số hàng mới
    // fetchProducts(0, parseInt(event.target.value, 10));
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
        <Table sx={{ minWidth: 1000 }} aria-label="product table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>STT</strong></TableCell>
              <TableCell><strong>SẢN PHẨM</strong></TableCell>
              <TableCell><strong>MÔ TẢ</strong></TableCell>
              <TableCell><strong>CHẤT LIỆU</strong></TableCell>
              <TableCell align="right"><strong>GIÁ</strong></TableCell>
              <TableCell align="center"><strong>SỐ LƯỢNG</strong></TableCell>
              <TableCell align="center"><strong>ĐÃ BÁN</strong></TableCell>
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
                <TableCell>
                  {page * rowsPerPage + index + 1}
                </TableCell>

                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={row.image}
                      alt={row.name}
                      sx={{ width: 60, height: 60, mr: 2 }}
                      variant="rounded"
                    />
                    <Typography variant="body2" fontWeight="medium">
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell sx={{ maxWidth: 200 }}>
                  <Tooltip title={row.description} placement="top-start">
                    <Typography variant="body2">
                      {truncateDescription(row.description)}
                    </Typography>
                  </Tooltip>
                </TableCell>

                <TableCell sx={{ maxWidth: 150 }}>
                  <Typography variant="body2">
                    {row.material}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography fontWeight="bold" color="primary">
                    {formatCurrency(row.price)}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: row.stock > 0 ? '#e8f5e8' : '#ffe6e6',
                      color: row.stock > 0 ? '#2e7d32' : '#d32f2f',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {row.stock}
                  </Box>
                </TableCell>

                <TableCell align="center">
                  {row.sold}
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>

                    <Tooltip title="Sửa sản phẩm">
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

                    <Tooltip title="Xóa sản phẩm">
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
          <Typography>Bạn có chắc chắn muốn xóa sản phẩm này không?</Typography>
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

export default TableProduct