import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [orderCompleted, setOrderCompleted] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      showToast('Your cart is empty.');
      return;
    };
    
    clearCart();
    
    setOrderCompleted(true);

    showToast('Order placed successfully!');
  };
  
  // Order Completed Display
  if (orderCompleted) {
    return (
      <div className="account-container text-center">
        <h1>Thank you for your order! 🐾</h1>
        <p>Your order has been placed and is being processed.</p>
        <div className="mt-20">
          <Link to="/" className="btn-account btn-link-reset">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  // If cart is empty and order not completed yet
  if (cartItems.length === 0 && !orderCompleted) {
    return (
      <div className="checkout-container text-center">
        <h2>Checkout</h2>
        <p>Your shopping cart is empty. Please add items before checking out.</p>
        <div className="mt-20">
          <Link to="/" className="btn-account btn-link-reset">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  };
  
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="order-summary-item">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="order-summary-total">
          <span>Total Amount</span>
          <span>${totalPrice.toLocaleString()}</span>
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
          <input type="text" id="address" required placeholder="e.g. 10 George Street, Sydney" />
        </div>

        <div className="form-group">
          <label htmlFor="postcode">Postcode</label>
          <input type="text" id="postcode" required placeholder="e.g. 2000" />
        </div>

        <h3>Payment Details</h3>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" required placeholder="**** **** **** ****" maxLength="19" />
        </div>

        <button type="submit" className="btn-primary">
          Pay Now (${totalPrice.toLocaleString()})
        </button>
      </form>
    </div>
  );
}

export default Checkout;