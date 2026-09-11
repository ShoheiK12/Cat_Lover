import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  
  const { toggleWishlist, isInWishlist } = useWishlist();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="page-container">
        <h2>Shopping cart</h2>
        <p>Your cart is empty at the moment.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Shopping Cart</h2>
      <div className="cart-list">
        {cartItems.map((item) => {
          const isFavorite = isInWishlist(item.id);

          return (
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

              <div className="cart-item-actions">
                <button
                  className={`btn-wishlist ${isFavorite ? 'active' : ''}`}
                  onClick={() => toggleWishlist(item)}
                  title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  {isFavorite ? '♥ In Wishlist' : '♡ Save to Wishlist'}
                </button>

                <button
                  className="btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

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