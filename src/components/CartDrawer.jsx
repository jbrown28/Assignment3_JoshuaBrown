
import CartItem from './CartItem'

function CartDrawer({
  isOpen,
  cart,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout
}) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  if (!isOpen) {
    return null
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
        aria-label="Shopping cart"
      >
        <div className="cart-header">
          <h2>Your Cart ({cart.length})</h2>

          <button
            type="button"
            className="close-cart"
            onClick={onClose}
            aria-label="Close shopping cart"
          >
            &times;
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <p className="empty-cart">
              Your cart is currently empty.
            </p>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <button
            type="button"
            className="checkout-button"
            onClick={onCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>

          <button
            type="button"
            className="continue-shopping"
            onClick={onClose}
          >
            Continue Shopping
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
