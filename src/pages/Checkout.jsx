import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cartItems } = useCart();
  const [orderCompleted, setOrderCompleted] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = (e) => {
    e.preventDefault();
    setOrderCompleted(true);
  };

  if (cartItems.length === 0 && !orderCompleted) {
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>Your shopping cart is empty. Please add items before checking out.</p>
        <Link to="/">Return to Shop</Link>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="checkout-container">
        <h2>Order Confirmed!</h2>
        <div className="success-message">
          <h3>Thank you for your purchase 🐾</h3>
          <p>Your order has been placed successfully. A confirmation email has been sent to your address.</p>
        </div>
        <div className="mt-20">
          <Link to="/">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="order-summary-item">
            <span>{item.name} × {item.quantity}</span>
            <span>¥{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="order-summary-total">
          <span>Total Amount</span>
          <span>¥{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <form className="contact-form" onSubmit={handlePayment}>
        <h3>Delivery Address</h3>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" required placeholder="e.g. Oliver Smith" />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address Line</label>
          <input type="text" id="address" required placeholder="e.g. 10 High Street, London" />
        </div>

        <div className="form-group">
          <label htmlFor="postcode">Postcode</label>
          <input type="text" id="postcode" required placeholder="e.g. SW1A 1AA" />
        </div>

        <h3>Payment Details</h3>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" required placeholder="**** **** **** ****" maxLength="19" />
        </div>

        <button type="submit" className="btn-primary">
          Pay Now (¥{totalPrice.toLocaleString()})
        </button>
      </form>
    </div>
  );
}

export default Checkout;