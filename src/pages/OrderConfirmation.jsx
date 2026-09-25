import { Link } from 'react-router-dom';

function OrderConfirmation() {
  const orderNumber = `CAT-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="page-container">
      <div className="empty-state-card">
        <div className="empty-state-icon" role="img" aria-label="party icon">
          🎉
        </div>
        <h2 className="empty-state-title">Thank You for Your Order!</h2>
        <p className="empty-state-message">
          Your order <strong>#{orderNumber}</strong> has been successfully placed. We are preparing your cat supplies with care! 🐾
        </p>
        <Link to="/" className="empty-state-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;