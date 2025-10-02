import { Box, Button, Container, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import React, { useEffect, useState } from 'react'
import ServiceDetail from '~/components/customer/ServiceDetail/ServiceDetail'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetailAPI } from '~/apis/productAPIs'
import { useCart } from '~/context/Cart/useCart'

const formatCurrency = (amount) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)

function ProductDetail() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState({})
  const [_loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchProduct = async () => {
      try {
        const product = await getProductDetailAPI(productId)
        setProduct(product)
      } catch {
        //
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  const handleCartClick = async () => { // ĐÃ THÊM ASYNC
    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate('/login')
      return
    }

    if (product && product._id) {
      try {
        setIsAdding(true)

        console.log('Sending Product ID:', product._id)

        await addToCart(product, 1)

      } catch (error) {
        // LỖI XẢY RA. Kiểm tra console.error này!
        console.error('LỖI THÊM GIỎ HÀNG:', error)
        // alert('Thêm vào giỏ hàng thất bại: ' + error.message)
      } finally {
        setIsAdding(false) // Kết thúc loading nút
      }
    }
  }

  return (
    <Container sx={{ px: 10, py: 4, display: 'flex', gap: 10 }}>
      <Box sx={{ backgroundColor: '#f7f7f7' }}>
        <img src={product.image} alt={product.name} style={{ width: '500px' }}/>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Mã: {product.name?.split(' ').pop()}
          </Typography>
          <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ fontSize: 20, color: 'gold', }}/> (0)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              {product.sold} đã bán
            </Typography>
          </Box>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>
          {formatCurrency(product.price)}
        </Typography>
        <ServiceDetail />
        <Box sx={{ mt: 2, borderRadius: '8px' }}>
          <Box sx={{ backgroundColor: '#f7f7f7', height: '50px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', display: 'flex', alignItems: 'center', px: 2 }}>
            <Typography variant="h6">
              Mô tả sản phẩm
            </Typography>
          </Box>
          <Box sx={{ borderBottomRightRadius: '8px', borderBottomLeftRadius: '8px' }}>
            <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
              {product.description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant='outlined' sx={{ width: '100%', mt: 2, textTransform: 'none' }} onClick={handleCartClick} disabled={_loading || isAdding}>
          <Typography sx={{ m: 0.5 }}>
            Thêm vào giỏ hàng
          </Typography>
        </Button>
      </Box>
    </Container>
  )
}

export default ProductDetail
