import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import Slider from 'react-slick'
import ProductCard from './ProductCard/ProductCard'

const newProducts = [
  {
    id: 1,
    name: 'Hạt Charm Bạc đính đá STYLE By PNJ',
    image: 'https://cdn.pnj.io/images/thumbnails/485/485/detailed/264/sp-sixmxmc000012-hat-charm-bac-dinh-da-style-by-pnj-1.png',
    code: 'XMXMC000012',
    price: '655.000',
    sold: '57'
  },
  {
    id: 2,
    name: 'Hạt Charm Bạc đính đá STYLE By PNJ',
    image: 'https://cdn.pnj.io/images/thumbnails/485/485/detailed/264/sp-sixm00y000023-hat-charm-bac-dinh-da-style-by-pnj-1.png',
    code: 'XMXMC000023',
    price: '755.000',
    sold: '100+'
  },
  {
    id: 3,
    name: 'Hạt Charm Bạc đính đá STYLE By PNJ',
    image: 'https://cdn.pnj.io/images/thumbnails/485/485/detailed/264/sp-gmddddw002968-mat-day-chuyen-kim-cuong-vang-trang-14k-pnj-1.png',
    code: 'XMXMC000023',
    price: '755.000',
    sold: '100+'
  },
  {
    id: 4,
    name: 'Hạt Charm Bạc đính đá STYLE By PNJ',
    image: 'https://cdn.pnj.io/images/thumbnails/485/485/detailed/264/sp-gn0000y003857-nhan-nam-vang-24k-mancode-by-pnj-manh-me-vuon-tam-1.png',
    code: 'XMXMC000023',
    price: '755.000',
    sold: '100+'
  },
  {
    id: 5,
    name: 'Hạt Charm Bạc đính đá STYLE By PNJ',
    image: 'https://cdn.pnj.io/images/thumbnails/485/485/detailed/264/sp-gn0000y003857-nhan-nam-vang-24k-mancode-by-pnj-manh-me-vuon-tam-1.png',
    code: 'XMXMC000023',
    price: '755.000',
    sold: '100+'
  },
  {
    id: 6,
    name: 'Hạt Charm Bạc đính đá STYLE By PNJ',
    image: 'https://cdn.pnj.io/images/thumbnails/485/485/detailed/264/sp-gn0000y003857-nhan-nam-vang-24k-mancode-by-pnj-manh-me-vuon-tam-1.png',
    code: 'XMXMC000023',
    price: '755.000',
    sold: '100+'
  },
]

const bestSellerProducts = [
  {
    id: 3,
    name: 'Mặt dây chuyền Kim cương Vàng Trắng',
    image: 'https://cdn.pnj.io/images/thumbnails/485/485/detailed/264/sp-sixm00y000023-hat-charm-bac-dinh-da-style-by-pnj-1.png',
    price: '8.868.000',
    sold: '43'
  },
  {
    id: 4,
    name: 'Nhẫn nam Vàng 24K MANCODE by PNJ',
    image: 'https://cdn.pnj.io/images/thumbnails/485/485/detailed/264/sp-sixm00y000023-hat-charm-bac-dinh-da-style-by-pnj-1.png',
    price: '47.589.000',
    sold: '42'
  },
]

function ProductHome() {
  const [selectedButton, setSelectedButton] = useState('new')

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
              <Box key={product.id}>
                <ProductCard product={product} />
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
