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
    <Box sx={{
      backgroundImage: 'url("https://cdn.pnj.io/images/2023/relayout-pdp/Frame%2055883.png?1730781085068")',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>

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

        <FormLabel sx={{ display: 'flex', justifyContent: 'Center', fontSize: '30px', color:'#0c3860', mb: '4px' }}>Nhập Thông Tin</FormLabel>

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
          <MenuItem value='0'>Chọn Tỉnh/Thành phố</MenuItem>
          <MenuItem value='HCM'>Hồ Chí Minh</MenuItem>
          <MenuItem value='HN'>Hà Nội</MenuItem>
          <MenuItem value='Hue'>Huế</MenuItem>
          <MenuItem value='QN'>Quảng Ninh</MenuItem>
          <MenuItem value='CB'>Cao Bằng</MenuItem>
          <MenuItem value='LS'>Lạng Sơn</MenuItem>
          <MenuItem value='LC'>Lai Châu</MenuItem>
          <MenuItem value='DB'>Điện Biên</MenuItem>
          <MenuItem value='SL'>Sơn La</MenuItem>
          <MenuItem value='TH'>Thanh Hóa</MenuItem>
          <MenuItem value='NA'>Nghệ An</MenuItem>
          <MenuItem value='HT'>Hà Tĩnh</MenuItem>
          <MenuItem value='TQ'>Tuyên Quang</MenuItem>
          <MenuItem value='LC'>Lào Cai</MenuItem>
          <MenuItem value='TN'>Thái Nguyên</MenuItem>
          <MenuItem value='PT'>Phú Thọ</MenuItem>
          <MenuItem value='BN'>Bắc Ninh</MenuItem>
          <MenuItem value='HY'>Hưng Yên</MenuItem>
          <MenuItem value='HP'>Hải Phòng</MenuItem>
          <MenuItem value='NB'>Ninh Bình</MenuItem>
          <MenuItem value='QT'>Quảng Trị</MenuItem>
          <MenuItem value='DN'>Đà Nẵng</MenuItem>
          <MenuItem value='QN'>Quảng Ngãi</MenuItem>
          <MenuItem value='GL'>Gia Lai</MenuItem>
          <MenuItem value='KH'>Khánh Hòa</MenuItem>
          <MenuItem value='LD'>Lâm Đồng</MenuItem>
          <MenuItem value='DL'>Đắc Lắk</MenuItem>
          <MenuItem value='DN'>Đồng Nai</MenuItem>
          <MenuItem value='TN'>Tây Ninh</MenuItem>
          <MenuItem value='CT'>Cần Thơ</MenuItem>
          <MenuItem value='VL'>Vĩnh Long</MenuItem>
          <MenuItem value='DT'>Đồng Tháp</MenuItem>
          <MenuItem value='CM'>Cà Mau</MenuItem>
          <MenuItem value='AG'>An Giang</MenuItem>
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
    </Box>
  )
}

export default CreateInformation
