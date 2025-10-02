import React, { useState, useEffect } from 'react'
import CartContext from './CartContext'
import {
  getCartByUserAPI,
  addToCartAPI,
  updateQuantityAPI,
  removeItemAPI,
  clearCartAPI
} from '~/apis/cartAPIs'

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch cart từ backend
  const fetchCart = async () => {
    try {
      setLoading(true)
      const res = await getCartByUserAPI()
      if (res.success) {
        setCartItems(res.data?.items || [])
      } else {
        setCartItems([])
      }
    } catch {
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  // Thêm sản phẩm
  const addToCart = async (product, quantity = 1) => {
    if (!product?._id) return
    try {
      const res = await addToCartAPI(product._id.toString(), quantity)
      if (res.success) {
        setCartItems(res.data?.items || [])
      }
    } catch {
      //
    }
  }

  // Cập nhật số lượng
  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await updateQuantityAPI(productId, quantity)
      if (res.success) setCartItems(res.data?.items || [])
    } catch {
      //
    }
  }

  // Xóa 1 sản phẩm
  const removeFromCart = async (productId) => {
    try {
      const res = await removeItemAPI(productId)
      if (res.success) setCartItems(res.data?.items || [])
    } catch {
      //
    }
  }

  // Xóa toàn bộ giỏ hàng
  const clearCart = async () => {
    try {
      const res = await clearCartAPI()
      if (res.success) setCartItems(res.data?.items || [])
    } catch {
      //
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart: fetchCart // optional: force fetch
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
