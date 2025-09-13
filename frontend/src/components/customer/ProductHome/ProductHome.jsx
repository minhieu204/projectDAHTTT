import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import ProductCard from './ProductCard/ProductCard'
import { fetchAllProductsAPI } from '~/apis'

function ProductHome() {
  const [allProducts, setAllProducts] = useState([])
  const [selectedButton, setSelectedButton] = useState('new')

  useEffect(() => {
    // Gọi API để lấy tất cả sản phẩm
    fetchAllProductsAPI().then((data) => {
      setAllProducts(data)
    })
  }, [])

  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  // Lọc và sắp xếp sản phẩm mới
  // Lọc sản phẩm có createdAt trong vòng 1 tuần và sắp xếp theo thời gian
  const newProducts = [...allProducts]
    .filter(product => product.createdAt > oneWeekAgo)
    .sort((a, b) => b.createdAt - a.createdAt)

  // Lọc và sắp xếp sản phẩm bán chạy
  // Lọc sản phẩm có sold > 20 và sắp xếp theo số lượng đã bán
  const bestSellerProducts = [...allProducts]
    .filter(product => product.sold > 20)
    .sort((a, b) => b.sold - a.sold)

  const productsToShow = selectedButton === 'new' ? newProducts : bestSellerProducts

  const getButtonStyle = (buttonName) => ({
    height: '42px',
    backgroundColor: selectedButton === buttonName ? '#143765' : 'white',
    color: selectedButton === buttonName ? 'white' : '#696969',
    border: 'solid 1px #696969',
    textTransform: 'none',
    fontSize: '20px',
    fontWeight: selectedButton === buttonName ? 'bold' : 'normal',
    '&.Mui-focusVisible': {
      backgroundColor: selectedButton === buttonName ? '#143765' : 'white',
      color: selectedButton === buttonName ? 'white' : '#696969',
    },
    borderRadius: '6px'
  })

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  }
  return (
    <Box
      sx={{
        height: '555px',
        width: '1152px',
        backgroundImage: 'url("https://cdn.pnj.io/images/2023/relayout-pdp/Frame%2055883.png?1730781085068")',
        mt: 6,
      }}
    >
      <Box
        sx={{
          height: '92px',
          mt: '25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Button
          onClick={() => setSelectedButton('new')}
          sx={getButtonStyle('new')}
        >
          Sản phẩm mới
        </Button>
        <Button
          onClick={() => setSelectedButton('best-seller')}
          sx={getButtonStyle('best-seller')}
        >
          Sản phẩm bán chạy
        </Button>
      </Box>

      {/* List san pham */}
      <Box>
        <Box sx={{ width: '90%', margin: 'auto' }}>
          <Slider {...settings}>
            {productsToShow.map(product => (
              <Box key={product._id}>
                <ProductCard
                  product={product}
                  isNew={selectedButton === 'new'}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>

      {/* Button xem them */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Box
          sx={{
            height: '40px',
            textTransform: 'none',
            backgroundColor: '#FFFFFF80',
            width: '111px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Xem thêm
        </Box>
      </Box>
    </Box>
  )
}

export default ProductHome
