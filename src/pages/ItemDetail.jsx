// src/pages/ItemDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { items } from '../data/items';
import { useCart } from '../context/CartContext';

function ItemDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <div>
        <h2>商品が見つかりませんでした。</h2>
        <Link to="/">トップページへ戻る</Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(item);
    alert(`${item.name} を買い物かごに追加しました！`);
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <Link to="/">← 一覧に戻る</Link>
      <div style={{ marginTop: '20px' }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', borderRadius: '8px' }}
        />
        <h2>{item.name}</h2>
        <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          ¥{item.price.toLocaleString()}
        </p>
        <p>{item.description}</p>
        
        <button
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            background: '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '15px'
          }}
          onClick={handleAddToCart}
        >
          買い物かごに入れる
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;