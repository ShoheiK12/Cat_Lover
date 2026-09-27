import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import EmptyState from '../components/EmptyState';
import { useOrder } from '../context/OrderContext';

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { addOrder } = useOrder();
  
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    postcode: '',
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
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
    
    const shippingAddress = `${formData.address}, ${formData.postcode}`;
    const createdOrder = addOrder({
      items: cartItems,
      totalAmount: totalPrice,
      shippingAddress: shippingAddress,
    });
    
    clearCart();
    
    showToast('Order placed successfully! 🐾', 'success');
    
    navigate('/order-confirmation', { state: { order: createdOrder } });
  };
  
  // If cart is empty and order not completed yet
  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <EmptyState
          icon="🛒"
          title="Your shopping cart is empty"
          message="Please add items to your cart before proceeding to checkout."
          buttonText="Return to Shop"
          buttonLink="/"
        />
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
          <input 
            type="text" 
            id="fullName" 
            required 
            placeholder="e.g. Oliver Smith"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address Line</label>
          <input 
            type="text" 
            id="address" 
            required 
            placeholder="e.g. 10 George Street, Sydney" 
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postcode">Postcode</label>
          <input 
            type="text" 
            id="postcode" 
            required 
            placeholder="e.g. 2000" 
            value={formData.postcode}
            onChange={handleChange}
          />
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