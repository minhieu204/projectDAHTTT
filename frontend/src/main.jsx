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
import CategoryPage from './pages/AdminPage/CategoryPage/CategoryPage.jsx'
import AddCategory from './pages/AdminPage/CategoryPage/AddCategory/AddCategory.jsx'
import EditCategory from './pages/AdminPage/CategoryPage/EditCategory/EditCategory.jsx'
import ListProduct from './pages/CustomerPage/ListProduct/ListProduct.jsx'
import ProductDetail from './pages/CustomerPage/ProductDetail/ProductDetail.jsx'
import Login from './pages/CustomerPage/Login/Login.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import StoryPage from './pages/CustomerPage/StoryPage/StoryPage.jsx'

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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/admin',
        element: <PrivateRoute allowedRoles={['admin']} />,
        children: [
          {
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
              {
                path: 'category',
                element: <CategoryPage />,
              },
              {
                path: 'category/add-category',
                element: <AddCategory />,
              },
              {
                path: 'category/edit-category/:categoryId',
                element: <EditCategory />,
              },
            ]
          }
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
          {
            path: 'story',
            element: <StoryPage />,
          },
          {
            path: 'listproduct/:genderSlug/:typeSlug/:materialSlug',
            element: <ListProduct />,
          },
          {
            path: 'productdetail/:productId',
            element: <ProductDetail />,
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
