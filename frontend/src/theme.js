import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme'
  },
  colorSchemes: {
  }
})

export default theme