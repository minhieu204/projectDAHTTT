import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { ThemeProvider } from '@mui/material'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider
      theme={theme}
      disableTransitionOnChange>
      <CssBaseline enableColorScheme/>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
