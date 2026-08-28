import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { items } from '../data/items';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import { StarRating } from '../components/StarRating';
import { ReviewHeader } from '../components/ReviewHeader';

function ItemDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { reviews, addReview, deleteReview } = useReviews();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="page-container">
        <h2>Item is not found.</h2>
        <Link to="/">Back to top page.</Link>
      </div>
    );
  }

  // Filtering: Dsiplay only items related to reviews
  const itemReviews = reviews.filter((review) => String(review.itemId) === String(id));

  const handleAddToCart = () => {
    addToCart(item);
    alert(`${item.name} has been added to your cart!`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Please enter a valid comment.');
      return;
    }

    addReview({
      itemId: id,
      name: user?.name || user?.email || 'Anonymous',
      rating: Number(rating),
      comment,
      date: new Date().toLocaleDateString(),
    });

    setComment('');
    setRating(5);
  };

  return (
    <div className="page-container">
      <Link to="/">← Back to item list</Link>
      
      <div className="item-detail-content">
        <img src={item.image} alt={item.name} />
        <h2>{item.name}</h2>
        <p className="price">${item.price.toLocaleString()}</p>
        <p>{item.description}</p>

        <button className="btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      <hr className="review-divider" />

      <div className="item-reviews-section">
        <h3>Customer Reviews ({itemReviews.length})</h3>


        <ReviewHeader />

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
                required
                className="review-textarea"
              />
            </div>

            <button type="submit" className="btn-secondary">
              Submit Review
            </button>
          </form>
        </div>

        <div className="review-list">
          {itemReviews.length === 0 ? (
            <p>No reviews for this product yet.</p>
          ) : (
            itemReviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card-header">
                  <strong>{review.name}</strong>
                  <span className="review-date">{review.date}</span>
                </div>
                
                <StarRating rating={review.rating} readOnly />

                <p className="review-comment">{review.comment}</p>

                {(user?.name === review.name || user?.email === review.name) && (
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="btn-delete-review"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;