import { createTheme } from '@mui/material/styles'

const FOCUS_COLOR = '#b3a8c4ff'

// Create a theme instance.
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme'
  },
  admin: {
    focusColor: FOCUS_COLOR
  },
  colorSchemes: {
  }
})

export default theme