import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { items } from '../data/items';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import { StarRating } from '../components/StarRating';
import { ReviewHeader } from '../components/ReviewHeader';
import { useToast } from '../context/ToastContext';
import AverageRating from '../../utils/reviewUtils';
import { useWishlist } from '../context/WishlistContext';

function ItemDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { reviews, addReview, deleteReview } = useReviews();
  const { addToast } = useToast();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  
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

  // Filtering: Dsiplay only items related to reviews
  const itemReviews = reviews.filter((review) => String(review.itemId) === String(id));
  
  // Sort reviews
  const sortedReviews = useMemo(() => {
  return [...itemReviews].sort((a, b) => {
    const numA = Number(a.rating) || 0;
    const numB = Number(b.rating) || 0;

    if (sortOrder === 'highest') {
      return numB - numA;
    }
    if (sortOrder === 'lowest') {
      return numA - numB;
    }
    if (sortOrder === 'newest') {
      const timeA = new Date(a.date).getTime() || 0;
      const timeB = new Date(b.date).getTime() || 0;
      return timeB - timeA;
    }
    if (sortOrder === 'oldest') {
      const timeA = new Date(a.date).getTime() || 0;
      const timeB = new Date(b.date).getTime() || 0;
      return timeA - timeB;
    }
    return 0;
  });
}, [itemReviews, sortOrder]);

  const handleAddToCart = () => {
    addToCart(item);
    addToast(`${item.name} added to cart!`, 'success');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      addToast('Please enter a valid comment.', 'error');
      return;
    }

    addReview({
      itemId: id,
      itemName: item.name,
      userId: user?.id || user?.email,
      name: user?.name || user?.email || 'Anonymous',
      rating: Number(rating),
      comment,
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now(),
    });

    setComment('');
    setRating(5);
    addToast('Review submitted successfully!', 'success');
  };
  
  const handleDeleteReview = (reviewId) => {
  deleteReview(reviewId);
  addToast('Review deleted.', 'info');
};

  return (
    <div className="page-container">
      <Link to="/">← Back to top page</Link>
      
      <div className="item-detail-content">
        <img src={item.image} alt={item.name} />
        <h2>{item.name}</h2>
        
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
        
        <div className="reviews-header-flex">
          <h3>Customer Reviews ({itemReviews.length})</h3>

          {itemReviews.length > 0 && (
            <div className="review-sort-container">
              <label htmlFor="review-sort">Sort by: </label>
              <select
                id="review-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="review-sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          )}
        </div>

        <ReviewHeader />

        {user ? (
          <div className="review-form-container">
            <h4>Write a Review for {item.name}</h4>
            <form onSubmit={handleReviewSubmit} className="account-form">
              <div className="form-group">
                <label>Rating:</label>
                <StarRating rating={rating} onRate={(val) => setRating(val)} />
              </div>

              <div className="form-group">
                <label htmlFor="item-rev-comment">Your Review:</label>
                <textarea
                  id="item-rev-comment"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this item."
                  className="review-textarea"
                />
              </div>

              <button type="submit" className="btn-secondary">
                Submit Review
              </button>
            </form>
          </div>
        ) : (
          <p className="login-prompt">Please log in to write a review for this product.</p>
        )}

        <div className="review-list">
          {sortedReviews.length === 0 ? (
            <p>No reviews for this product yet.</p>
          ) : (
            sortedReviews.map((review) => {
              const isOwner =
                user &&
                ((review.userId && String(user.id || user.email) === String(review.userId)) ||
                  user.name === review.name ||
                  user.email === review.name);

              return (
                <div key={review.id} className="review-card">
                  <div className="review-card-header">
                    <strong>{review.name}</strong>
                    <span className="review-date">{review.date}</span>
                  </div>
                  
                  <StarRating rating={review.rating} readOnly />

                  <p className="review-comment">{review.comment}</p>

                  {isOwner && (
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="btn-delete-review"
                    >
                      Delete
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;