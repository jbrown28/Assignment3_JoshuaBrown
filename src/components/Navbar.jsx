
import { Link } from 'react-router-dom'

function Navbar({ cartItemCount, onToggleCart }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          VINYL VAULT
        </Link>

        <nav className="navbar-links">
          <Link to="/">Shop</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>

        <button
          type="button"
          className="cart-button"
          onClick={onToggleCart}
          aria-label={`Open shopping cart containing ${cartItemCount} items`}
        >
          <span aria-hidden="true">🛒</span>
          <span>Cart</span>
          <span className="cart-count">{cartItemCount}</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
