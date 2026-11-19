
function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.title}
        className="cart-item-image"
      />

      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p>{item.artist}</p>
        <p className="cart-item-price">
          ${item.price.toFixed(2)}
        </p>

        <div className="quantity-controls">
          <button
            type="button"
            onClick={() => onDecrease(item.id)}
            aria-label={`Decrease quantity of ${item.title}`}
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            onClick={() => onIncrease(item.id)}
            disabled={item.quantity >= item.stock}
            aria-label={`Increase quantity of ${item.title}`}
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="remove-item"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>

      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  )
}

export default CartItem
