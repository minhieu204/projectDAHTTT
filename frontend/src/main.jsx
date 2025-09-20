import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { ThemeProvider } from '@mui/material'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import HomePage from './pages/CustomerPage/HomePage/HomePage.jsx'
import CustomerPage from './pages/CustomerPage/CustomerPage.jsx'
import ProductPage from './pages/AdminPage/ProductPage/ProductPage.jsx'
import AddProduct from './pages/AdminPage/ProductPage/AddProduct/AddProduct.jsx'
import EditProduct from './pages/AdminPage/ProductPage/EditProduct/EditProduct.jsx'
import Register from './pages/CustomerPage/Register/Register.jsx'
import PageRoute from './pages/PageRoute/PageRoute.jsx'
import CreateInformation from './pages/CustomerPage/AccountInformation/CreateInformation.jsx'

let router = createBrowserRouter([
  {
    path: '/',
    element: <PageRoute />,
    children: [
      {
        index: true,
        element: <Register />
      },
      {
        path: '/admin',
        element: <AdminPage />,
        children: [
          {
            index: true,
            element: <ProductPage />
          },
          {
            path: 'product',
            element: <ProductPage />,
          },
          {
            path: 'product/add-product',
            element: <AddProduct />,
          },
          {
            path: 'product/edit-product/:productId',
            element: <EditProduct />,
          },
        ]
      },
      {
        path: '/customer',
        element: <CustomerPage />,
        children: [
          {
            index: true,
            element: <HomePage />
          },
          {
            path: 'editprofile',
            element: <CreateInformation />,
          },
        ]
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider
      theme={theme}
      disableTransitionOnChange>
      <CssBaseline enableColorScheme/>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
