
import { useState } from 'react'
import { Link } from 'react-router-dom'
import OrderSummary from '../components/OrderSummary'

function CheckoutPage({ cart, onCompleteOrder }) {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    cardDetails: ''
  })

  const [formErrors, setFormErrors] = useState({})
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const handleChange = (event) => {
  const { name, value } = event.target

  setFormData((previousData) => ({
    ...previousData,
    [name]: value
  }))

  setFormErrors((previousErrors) => {
    const updatedErrors = { ...previousErrors }
    delete updatedErrors[name]

    if (
      name === 'postalCode' &&
      value.trim() &&
      !/^\d{5}(-\d{4})?$/.test(value.trim())
    ) {
      updatedErrors.postalCode =
        'Enter a valid ZIP code (e.g., 48329).'
    }

    return updatedErrors
  })
}

  const handleSubmit = (event) => {
    event.preventDefault()

    const errors = {}

    Object.entries(formData).forEach(([field, value]) => {
        if (!value.trim()) {
        errors[field] = 'This field is required.'
        }
    })

    const postalCodePattern = /^\d{5}(-\d{4})?$/

    if (
        formData.postalCode.trim() &&
        !postalCodePattern.test(formData.postalCode.trim())
    ) {
        errors.postalCode = 'Enter a valid ZIP code (e.g., 48329).'
    }

    setFormErrors(errors)

    if (Object.keys(errors).length > 0) return

    onCompleteOrder()
    setOrderConfirmed(true)
  }

  if (orderConfirmed) {
    return (
      <main className="checkout-page">
        <div className="confirmation-message">
          <h1>Order Confirmed!</h1>
          <p>Thank you for shopping at Vinyl Vault.</p>
          <p>Your demonstration order has been completed.</p>
          <Link to="/">Return to Store</Link>
        </div>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <h1>Your cart is empty.</h1>
        <Link to="/">Return to the Store</Link>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <section className="checkout-form-section">
          <h2>Shipping and Payment Information</h2>
          <p>
            Demonstration only: use fictional information.
            Do not enter real payment details.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {[
              ['fullName', 'Full Name'],
              ['address', 'Address'],
              ['city', 'City'],
              ['postalCode', 'Postal Code'],
              ['cardDetails', 'Card Details (Demonstration Only)']
            ].map(([name, label]) => (
              <div className="form-group" key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                  id={name}
                  name={name}
                  type="text"
                  value={formData[name]}
                  onChange={handleChange}
                />
                {formErrors[name] && (
                  <p className="form-error">{formErrors[name]}</p>
                )}
              </div>
            ))}

            <button type="submit" className="checkout-button">
              Place Demonstration Order
            </button>
          </form>
        </section>

        <OrderSummary cart={cart} />
      </div>
    </main>
  )
}

export default CheckoutPage
