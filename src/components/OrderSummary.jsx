
function OrderSummary({ cart }) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <section className="order-summary">
      <h2>Order Summary</h2>

      {cart.map((item) => (
        <div className="order-summary-item" key={item.id}>
          <div>
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
          </div>

          <strong>
            ${(item.price * item.quantity).toFixed(2)}
          </strong>
        </div>
      ))}

      <div className="order-summary-total">
        <span>Subtotal</span>
        <strong>${subtotal.toFixed(2)}</strong>
      </div>
    </section>
  )
}

export default OrderSummary
