import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="page-container">
        <h2>Shopping cart</h2>
        <p>Your cart is empty at the moment.</p>
        <Link to="/">Back to item list</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Shopping Cart</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div>
              <h3>{item.name}</h3>
              <p>${item.price.toLocaleString()} each</p>
              
              <div className="quantity-controls">
                <button
                  className="btn-quantity"
                  onClick={() => updateQuantity(item.id, -1)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button
                  className="btn-quantity"
                  onClick={() => updateQuantity(item.id, 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="btn-danger"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="cart-summary">
          <h3>Total Amount: ${totalPrice.toLocaleString()}</h3>
          <Link to="/checkout" className="btn-checkout">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;