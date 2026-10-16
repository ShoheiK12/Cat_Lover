import { useParams, Link } from 'react-router-dom';
import { items } from '../data/items';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import ReviewList from '../components/ReviewList';
import { StarRating } from '../components/StarRating';
import AverageRating from '../../utils/reviewUtils';
import { useReviews } from '../context/ReviewContext';

function ItemDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { reviews } = useReviews();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const item = items.find((i) => String(i.id) === String(id));

  if (!item) {
    return (
      <div className="page-container">
        <h2>Item is not found.</h2>
        <Link to="/">Back to top page.</Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(item.id);
  const { average, count } = AverageRating(reviews, id);

  const handleAddToCart = () => {
    addToCart(item);
    addToast(`${item.name} added to cart!`, 'success');
  };

  return (
    <div className="page-container">
      <Link to="/">← Back to top page</Link>
      
      <div className="item-detail-content">
        <img src={item.image} alt={item.name} />
        <h2 className='item-detail-headline'>{item.name}</h2>
        
        <div className="item-rating-summary">
          <StarRating rating={Math.round(average)} readOnly />
          <span className="rating-text">
            {count > 0 ? `${average} / 5.0 (${count} reviews)` : 'No reviews yet'}
          </span>
        </div>
        
        <p className="price">${item.price.toLocaleString()}</p>
        <p>{item.description}</p>
        
        <div className="action-buttons">
          <button className="btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
  
          <button 
            className={`btn-wishlist ${isFavorite ? 'active' : ''}`} 
            onClick={() => toggleWishlist(item)}
          >
            {isFavorite ? '♥ In Wishlist' : '♡ Add to Wishlist'}
          </button>
       </div>
       
      </div>

      <hr className="review-divider" />
      
      <div className="item-reviews-section">
        <ReviewList itemId={item.id} />
      </div>
      
    </div>
  );
}

export default ItemDetail;