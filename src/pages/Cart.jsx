import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div>
        <h2>Shopping cart</h2>
        <p>Your cart is empty at the moment.</p>
        <Link to="/">Back to item list</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Shopping cart</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div>
              <h3>{item.name}</h3>
              <p>
                ${item.price.toLocaleString()} × {item.quantity} items
              </p>
            </div>
            <button className="btn-danger" onClick={() => removeFromCart(item.id)}>
              Delete
            </button>
          </div>
        ))}

        <div className="cart-summary">
          <h3>Total amount: ${totalPrice.toLocaleString()}</h3>
          <Link to="/checkout" className="btn-checkout">
            Proceed with payment
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;