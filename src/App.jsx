
import { useState } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'

import CatalogPage from './pages/CatalogPage'
import AlbumDetailPage from './pages/AlbumDetailPage'
import CheckoutPage from './pages/CheckoutPage'

import './styles.css'

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const navigate = useNavigate()

  // Add an album to the shopping cart.
  const handleAddToCart = (album) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === album.id
      )

      if (existingItem) {
        if (existingItem.quantity >= album.stock) {
          return currentCart
        }

        return currentCart.map((item) =>
          item.id === album.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      if (album.stock < 1) {
        return currentCart
      }

      return [...currentCart, { ...album, quantity: 1 }]
    })
  }

  // Increase an item's quantity.
  const handleIncreaseQuantity = (albumId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === albumId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  // Decrease an item's quantity.
  const handleDecreaseQuantity = (albumId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === albumId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // Remove an item completely.
  const handleRemoveItem = (albumId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== albumId)
    )
  }

  // Toggle the cart drawer.
  const handleToggleCart = () => {
    setIsCartOpen((previousState) => !previousState)
  }

  const handleCloseCart = () => {
    setIsCartOpen(false)
  }

  // Navigate to checkout from the cart.
  const handleCheckout = () => {
    setIsCartOpen(false)
    navigate('/checkout')
  }

  // Complete the order.
  const handleCompleteOrder = () => {
    setCart([])
    setIsCartOpen(false)
  }

  // Calculate the total number of items in the cart.
  const cartItemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <>
      <Navbar
        cartItemCount={cartItemCount}
        onToggleCart={handleToggleCart}
      />

      <Routes>
        <Route
          path="/"
          element={
            <CatalogPage onAddToCart={handleAddToCart} />
          }
        />

        <Route
          path="/album/:albumId"
          element={
            <AlbumDetailPage onAddToCart={handleAddToCart} />
          }
        />

        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              onCompleteOrder={handleCompleteOrder}
            />
          }
        />
      </Routes>

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={handleCloseCart}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </>
  )
}

export default App
