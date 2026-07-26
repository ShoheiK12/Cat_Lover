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
        <h2>Item is not found.</h2>
        <Link to="/">Back to top page.</Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(item);
    alert(`${item.name} has been added to your cart!`);
  };

  return (
    <div className="page-container">
      <Link to="/">← Back to item list</Link>
      <div className="item-detail-content">
        <img src={item.image} alt={item.name}/>
        <h2>{item.name}</h2>
        <p className="price">
          ${item.price.toLocaleString()}
        </p>
        <p>{item.description}</p>
        
        <button className="btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;