import { Box, Button, Container, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import React, { useEffect, useState } from 'react'
import ServiceDetail from '~/components/customer/ServiceDetail/ServiceDetail'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetailAPI } from '~/apis/productAPIs'
import { getRatingsByProductId } from '~/apis/ratingAPIs'
import { useCart } from '~/context/Cart/useCart'

const formatCurrency = (amount) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)

function ProductDetail() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const { addToCart, cartItems } = useCart()
  const [product, setProduct] = useState({})
  const [_loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [_ratings, setRatings] = useState([])
  const [averageStar, setAverageStar] = useState(0)
  useEffect(() => {
    setLoading(true)
    const calculateAverageRating = (ratings) => {
      if (!ratings || ratings.length === 0) return 0
      const total = ratings.reduce((sum, r) => sum + r.star, 0)
      return total / ratings.length
    }
    const fetchProduct = async () => {
      try {
        const product = await getProductDetailAPI(productId)
        setProduct(product)
        const ratings = await getRatingsByProductId(productId)
        setRatings(ratings)
        setAverageStar(calculateAverageRating(ratings))
      } catch {
        //
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  const existingItem = cartItems.find(item => item.productId === product._id)
  const currentQuantity = existingItem ? existingItem.quantity : 0
  const maxStock = product.stock || 0
  const isOutOfStock = currentQuantity >= maxStock || maxStock === 0

  const handleCartClick = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate('/login')
      return
    }

    if (product && product._id && !isOutOfStock) {
      try {
        setIsAdding(true)

        await addToCart(product, 1)

      } catch {
        //
      } finally {
        setIsAdding(false)
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
              <StarIcon sx={{ fontSize: 20, color: 'gold', }}/> ({averageStar.toFixed(1)})
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
        <Button variant='outlined' sx={{ width: '100%', mt: 2, textTransform: 'none' }} onClick={handleCartClick} disabled={_loading || isAdding || isOutOfStock}>
          <Typography sx={{ m: 0.5 }}>
            Thêm vào giỏ hàng
          </Typography>
        </Button>
      </Box>
    </Container>
  )
}

export default ProductDetail
