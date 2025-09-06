import { Box, Container } from '@mui/material'
import React from 'react'
import TopBar from './TopBar/TopBar'
import NavBar from './NavBar/NavBar'

function Header() {
  return (
    <Box>
      <Box sx={{ borderBottom: 'solid 1px #DCDCDC', mx: 10, pb: 1 }}>
        <Container>
          <TopBar />
        </Container>
      </Box>
      <Container sx={{ mt: '2px' }}>
        <NavBar />
      </Container>
    </Box>
  )
}

export default Header
