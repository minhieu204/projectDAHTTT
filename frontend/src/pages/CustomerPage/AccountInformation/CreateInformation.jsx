import { Box, TextField, Button, RadioGroup, FormControlLabel, Radio, FormLabel, MenuItem, Container } from '@mui/material'
import { useState } from 'react'

function CreateInformation() {
  const [form, setForm] = useState({
    gender: '',
    fullName: '',
    birthday: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
  })


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        my: 3,
        p: '25px 75px 30px 80px',
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 4,
      }}
    >

      <FormLabel sx={{ display: 'flex', justifyContent: 'Center', fontSize: '30px', color:'black', mb: '4px' }}>Nhập Thông Tin</FormLabel>

      <FormLabel component='legend' sx={{ ml: 0.5 }}>Giới Tính *</FormLabel>
      <RadioGroup
        row
        name='gender'
        value={form.gender}
        onChange={handleChange}
        sx={{ mb: 0, ml: 0.5 }}
      >
        <FormControlLabel value='Chị' control={<Radio />} sx={{ mr: 4 }}label='Chị' />
        <FormControlLabel value='Anh' control={<Radio />} label='Anh' />
      </RadioGroup>

      <TextField
        fullWidth
        margin='normal'
        label='Họ và tên'
        name='fullName'
        value={form.fullName}
        onChange={handleChange}
        required
      />

      <TextField
        fullWidth
        margin='normal'
        label='Ngày sinh'
        name='birthday'
        type='date'
        InputLabelProps={{ shrink: true }}
        value={form.birthday}
        onChange={handleChange}
        required
      />

      <TextField
        fullWidth
        margin='normal'
        label='Email'
        name='email'
        type='email'
        value={form.email}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        margin='normal'
        label='Số điện thoại'
        name='phone'
        type='tel'
        value={form.phone}
        onChange={handleChange}
        required
      />

      <TextField
        fullWidth
        margin='normal'
        label='Địa chỉ'
        name='address'
        value={form.address}
        onChange={handleChange}
      />

      <TextField
        select
        fullWidth
        margin='normal'
        label='Tỉnh/Thành phố'
        name='city'
        value={form.city}
        onChange={handleChange}
      >
        <MenuItem value=''>Chọn Tỉnh/Thành phố</MenuItem>
        {/* <MenuItem value='HCM'>Hồ Chí Minh</MenuItem>
        <MenuItem value='HN'>Hà Nội</MenuItem>
        <MenuItem value='Hue'>Huế</MenuItem>
        <MenuItem value=''>Quảng Ninh</MenuItem>
        <MenuItem value=''>Cao Bằng</MenuItem>
        <MenuItem value=''>Lạng Sơn</MenuItem>
        <MenuItem value=''>Lai Châu</MenuItem>
        <MenuItem value=''>Điện Biên</MenuItem>
        <MenuItem value=''>Sơn La</MenuItem> */}
        <MenuItem value=''>Thanh Hóa</MenuItem>
        <MenuItem value=''>Nghệ An</MenuItem>
        <MenuItem value=''>Hà Tĩnh</MenuItem>
        <MenuItem value=''>Tuyên Quang</MenuItem>
        <MenuItem value=''>Lào Cai</MenuItem>
        <MenuItem value=''>Thái Nguyên</MenuItem>
        <MenuItem value=''>Phú Thọ</MenuItem>
        <MenuItem value=''>Bắc Ninh</MenuItem>
        <MenuItem value=''>Hưng Yên</MenuItem>
        <MenuItem value=''>Hải Phòng</MenuItem>
        <MenuItem value=''>Ninh Bình</MenuItem>
        <MenuItem value=''>Quảng Trị</MenuItem>
        <MenuItem value=''>Đà Nẵng</MenuItem>
        <MenuItem value=''>Quảng Ngãi</MenuItem>
        <MenuItem value=''>Gia Lai</MenuItem>
        <MenuItem value=''>Khánh Hòa</MenuItem>
        <MenuItem value=''>Lâm Đồng</MenuItem>
        <MenuItem value=''>Đắc Lắk</MenuItem>
        <MenuItem value=''>Đồng Nai</MenuItem>
        <MenuItem value=''>Tây Ninh</MenuItem>
        <MenuItem value=''>Cần Thơ</MenuItem>
        <MenuItem value=''>Vĩnh Long</MenuItem>
        <MenuItem value=''>Đồng Tháp</MenuItem>
        <MenuItem value=''>Cà Mau</MenuItem>
        <MenuItem value=''>An Giang</MenuItem>
      </TextField>

      <TextField
        select
        fullWidth
        margin='normal'
        label='Phường/Xã'
        name='ward'
        value={form.ward}
        onChange={handleChange}
      >
        <MenuItem value=''>Chọn Phường/Xã</MenuItem>
      </TextField>

      <Button
        fullWidth
        type='submit'
        variant='contained'
        sx={{ mt: 3, bgcolor: '#4a3aff', borderRadius: '8px', py: 2, fontWeight: 'bold', fontSize: '15px' }}
      >
        Hoàn tất đăng ký
      </Button>
    </Box>
  )
}

export default CreateInformation
