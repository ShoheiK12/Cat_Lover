import { Link, useLocation } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

function OrderConfirmation() {
  const location = useLocation();
  const { orders } = useOrder();

  // 1. Prioritise retrieving the order passed via navigate in Checkout.jsx.
  // 2. If no data is passed directly, retrieve the latest order (the first element) from OrderContext.
  const order = location.state?.order || (orders.length > 0 ? orders[0] : null);

  if (!order) {
    return (
      <div className="account-container text-center">
        <h2>No Order Details Found</h2>
        <p>It looks like you reached this page directly without placing an order.</p>
        <div className="mt-20">
          <Link to="/" className="btn-account btn-link-reset">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="order-confirmation-hero">
        <div className="order-confirmation-icon">🎉</div>
        <h1 className='order-headline'>Thank You for Your Order! 🐾</h1>
        <p className="order-sentence">
          We have received your order and are preparing your cat supplies with care!
        </p>
      </div>

      <div className="account-details">
        <h3 className="detail-headline">Order Details</h3>
        
        <div className="order-history-card">
          <div className="order-history-header">
            <div>
              <strong>Order Number:</strong> #{order.id}
            </div>
            <div className="order-history-date">
              <strong>Date:</strong> {order.date}
            </div>
            <div>
              <strong>Status:</strong> <span className="order-status">{order.status}</span>
            </div>
          </div>

          <div className="order-history-items">
            <h4 className="order-history-items-title">Items Ordered</h4>
            {order.items.map((item) => (
              <div key={item.id} className="order-history-item">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="order-history-footer">
            <div className="order-address">
              <strong>Delivery Address:</strong> {order.shippingAddress}
            </div>
            <div className="order-total">
              <strong>Total Paid:</strong> ${order.totalAmount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="order-confirmation-actions">
          <Link to="/" className="btn-account">
            Continue Shopping
          </Link>
          <Link to="/account" className="btn-account btn-cancel">
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;