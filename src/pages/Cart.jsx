import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  // 合計金額の計算
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div>
        <h2>買い物かご</h2>
        <p>現在、買い物かごは空です。🐾</p>
        <Link to="/">商品一覧へ戻る</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2>買い物かご</h2>
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
                ¥{item.price.toLocaleString()} × {item.quantity}個
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
              削除
            </button>
          </div>
        ))}

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <h3>合計金額: ¥{totalPrice.toLocaleString()}</h3>
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
            決済手続きへ進む
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;