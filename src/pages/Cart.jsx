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
    <div style={{ maxWidth: '600px' }}>
      <h2>Shopping cart</h2>
      <div style={{ marginTop: '20px' }}>
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #ddd',
              padding: '10px 0'
            }}
          >
            <div>
              <h3>{item.name}</h3>
              <p>
                ${item.price.toLocaleString()} × {item.quantity}個
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        ))}

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <h3>Total amount: ${totalPrice.toLocaleString()}</h3>
          <Link
            to="/checkout"
            style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '10px 20px',
              background: '#2563eb',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Proceed with payment
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;