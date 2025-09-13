import { Button } from '@mui/material'
import React from 'react'

function SideBarItem({ icon: Icon, title }) {
  return (
    <Button
      sx={{
        width: '100%',
        height: '50px',
        ml: '10px',
        fontSize: '18px',
        color: 'white',
        display: 'flex',
        gap: 1,
        justifyContent: 'flex-start',
        textTransform: 'none',
        '&:focus': {
          backgroundColor: (theme) => theme.admin.focusColor,
          color: '#fff',
          transform: 'scale(1.02)',
        },
        '&:hover': {
          backgroundColor: (theme) => theme.admin.focusColor,
        }
      }}
    >
      {Icon && <Icon sx={{ fontSize: 28 }} />}
      {title}
    </Button>
  )
}

export default SideBarItem
