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
import CartProvider from './context/Cart/CartProvider.jsx'
import CartPage from './pages/CustomerPage/CartPage/CartPage.jsx'
import Checkout from './pages/CustomerPage/Checkout/Checkout.jsx'
import ThankYou from './pages/CustomerPage/ThankYou/ThankYou.jsx'
import OrderPage from './pages/AdminPage/OrderPage/OrderPage.jsx'
import MyOrders from './pages/CustomerPage/MyOrders/MyOrders.jsx'
import AccountPage from './pages/AdminPage/AccountPage/AccountPage.jsx'
import EditAccount from './pages/AdminPage/AccountPage/EditAccount/EditAccount.jsx'
import AddAccount from './pages/AdminPage/AccountPage/AddAccount/AddAccount.jsx'
import RatingsPage from './pages/AdminPage/RatingPage/RatingPage.jsx'
import AddPromotion from './pages/AdminPage/PromotionPage/AddPromotion/AddPromotion.jsx'
import PromotionPage from './pages/AdminPage/PromotionPage/PromotionPage.jsx'
import EditPromotion from './pages/AdminPage/PromotionPage/EditPromotion/EditPromotion.jsx'

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
        element: <PrivateRoute allowedRoles={['admin', 'employee']} />,
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
              {
                path: 'order',
                element: <OrderPage />,
              },
              {
                path: 'account',
                element: <AccountPage />,
              },
              {
                path: 'account/add-account',
                element: <AddAccount />,
              },
              {
                path: 'account/edit-account/:id',
                element: <EditAccount />,
              },
              {
                path: 'rating',
                element: <RatingsPage />,
              },
              {
                path: 'promotion',
                element: <PromotionPage />,
              },
              {
                path: 'promotion/add-promotion',
                element: <AddPromotion />,
              },
              {
                path: 'promotion/edit-promotion/:promotionId',
                element: <EditPromotion />,
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
            path: 'cart',
            element: <CartPage />,
          },
          {
            path: 'checkout',
            element: <Checkout />,
          },
          {
            path: 'thank-you',
            element: <ThankYou />,
          },
          {
            path: 'myorders',
            element: <MyOrders />,
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
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ThemeProvider>
  </StrictMode>,
)
