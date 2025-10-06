import React, { useEffect, useState } from 'react'
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
import { createPromotionAPI } from '~/apis/promotionAPIs'
import { fetchAllProductsAPI } from '~/apis/productAPIs'
import { fetchAllCategorysAPI } from '~/apis/categoryAPIs'

function AddPromotion() {
  const navigate = useNavigate()

  // ✅ State lưu form
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountPercent: '',
    startDate: '',
    endDate: '',
    categoryIds: [],
    productIds: []
  })

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  const [errors, setErrors] = useState({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // ✅ Fetch categories & products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catData, prodData] = await Promise.all([
          fetchAllCategorysAPI(),
          fetchAllProductsAPI()
        ])

        setCategories(catData.map((c) => ({
          value: c._id,
          label: c.name
        })))

        setProducts(prodData.map((p) => ({
          value: p._id,
          label: p.name
        })))
      } catch {
        //
      }
    }
    fetchData()
  }, [])

  // ✅ Xử lý đóng snackbar
  const handleCloseSnackbar = (_, reason) => {
    if (reason !== 'clickaway') {
      setSnackbar((prev) => ({ ...prev, open: false }))
    }
  }

  // ✅ Cập nhật giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // ✅ Cập nhật multiple select
  const handleMultiSelectChange = (name, selectedValues) => {
    // Đảm bảo giá trị là mảng string
    const normalized = Array.isArray(selectedValues)
      ? selectedValues
      : [selectedValues]
    setFormData((prev) => ({ ...prev, [name]: normalized }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // ✅ Validate dữ liệu trước khi gửi
  const validate = () => {
    const tempErrors = {
      title: formData.title ? '' : 'Vui lòng nhập tên khuyến mãi.',
      discountPercent:
        /^[0-9]+$/.test(formData.discountPercent) && formData.discountPercent
          ? ''
          : 'Giảm giá phải là số và không được để trống.',
      startDate: formData.startDate ? '' : 'Vui lòng chọn ngày bắt đầu.',
      endDate: formData.endDate ? '' : 'Vui lòng chọn ngày kết thúc.',
      description: formData.description ? '' : 'Vui lòng nhập mô tả.'
    }

    setErrors(tempErrors)
    return Object.values(tempErrors).every((x) => x === '')
  }

  // ✅ Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const promotionData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        discountPercent: parseInt(formData.discountPercent, 10),
        startDate: formData.startDate,
        endDate: formData.endDate,
        categoryIds: Array.isArray(formData.categoryIds)
          ? formData.categoryIds
          : [formData.categoryIds],
        productIds: Array.isArray(formData.productIds)
          ? formData.productIds
          : [formData.productIds]
      }

      await createPromotionAPI(promotionData)

      setSnackbar({
        open: true,
        message: 'Thêm khuyến mãi thành công!',
        severity: 'success'
      })

      setTimeout(() => navigate('/admin/promotion'), 800)
      setErrors({})
    } catch {
      setSnackbar({
        open: true,
        message: 'Có lỗi xảy ra khi thêm khuyến mãi. Vui lòng thử lại!',
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
        <Typography variant="h5">Thêm khuyến mãi</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ px: 6 }}>
        <FieldCustom
          label="Tên khuyến mãi"
          required
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          placeholder="Nhập tên chương trình..."
        />

        <FieldCustom
          label="Phần trăm giảm giá (%)"
          required
          name="discountPercent"
          value={formData.discountPercent}
          onChange={handleChange}
          error={!!errors.discountPercent}
          helperText={errors.discountPercent}
          placeholder="VD: 10, 20, 50..."
        />

        <FieldCustom
          label="Ngày bắt đầu"
          type="date"
          required
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          error={!!errors.startDate}
          helperText={errors.startDate}
        />

        <FieldCustom
          label="Ngày kết thúc"
          type="date"
          required
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          error={!!errors.endDate}
          helperText={errors.endDate}
        />

        <FieldCustom
          label="Mô tả"
          required
          multiline
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          placeholder="Nhập mô tả chương trình..."
        />

        <FieldCustom
          label="Danh mục áp dụng"
          multiple
          options={categories}
          value={formData.categoryIds || ''}
          onChange={(e) =>
            handleMultiSelectChange(
              'categoryIds',
              Array.isArray(e.target.value) ? e.target.value : [e.target.value]
            )
          }
        />

        <FieldCustom
          label="Sản phẩm áp dụng"
          multiple
          options={products}
          value={formData.productIds || ''}
          onChange={(e) =>
            handleMultiSelectChange(
              'productIds',
              Array.isArray(e.target.value) ? e.target.value : [e.target.value]
            )
          }
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
            Thêm khuyến mãi
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

export default AddPromotion
