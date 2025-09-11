import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const ProductCard = ({ product, isNew }) => {
  return (
    <Card sx={{ maxWidth: 400, borderRadius: 2, position: 'relative', m: 1, cursor: 'pointer' }}>
      {isNew && (
        <Box sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          bgcolor: 'white',
          p: 0.5,
          borderRadius: '50%',
          boxShadow: 1
        }}>
          <Typography variant="caption" sx={{ color: '#143765', fontWeight: 'bold' }}>
            NEW
          </Typography>
        </Box>
      )}

      <CardMedia
        component="img"
        width= '168px'
        height= '168px'
        image={product.image}
        alt={product.name}
      />
      <CardContent sx={{ pb: '4px !important' }}>
        <Typography sx={{ fontSize: '14px', color: '#5A5A5A', textAlign: 'center' }}>
          {product.name}
        </Typography>
        <Typography sx={{ fontSize: '16px', color: '#c48c46', textAlign: 'center', mt: 1 }}>
          {product.price} ₫
        </Typography>
        <Typography sx={{ fontSize: '10px', color: '#DC2626', textAlign: 'center', mt: 1 }}>
          Ưu đãi lên đến 2 Triệu & giảm thêm 1% cho khách hàng mới
        </Typography>
        <Typography sx={{ fontSize: '10px', color: '#5A5A5A', textAlign: 'right', mt: 1 }}>
          {product.sold} đã bán
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductCard