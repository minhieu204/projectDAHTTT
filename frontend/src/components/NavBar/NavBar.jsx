import { Box, Button, Typography } from '@mui/material'

function NavBar() {
  return (
    <Box sx={{
      display: 'flex',
      gap: 2,
      justifyContent: 'space-between',
      p: 2
    }}>
      <Box>
        <img
          style={{
            width: '100px'
          }}
          src="//womanbasic.com/wp-content/uploads/2025/03/cropped-z5559652309904_c2d991b7c56693e7e508986ca95e2090.jpg.webp"
          alt=""
        />
        <Typography variant='body2' ></Typography>
        <Button sx={{ width: '100px' }} variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Box>
      <Box>
        <Button variant="outlined">Outlined</Button>
      </Box>
    </Box>
  )
}

export default NavBar
