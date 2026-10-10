import { useState } from 'react';
import { Link } from 'react-router-dom';
import { items } from '../data/items';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import { StarRating } from './StarRating';
import { ReviewHeader } from './ReviewHeader';

function ReviewList({ itemId }) {
  const { user } = useAuth();
  const { reviews, addReview, deleteReview } = useReviews();

  const [selectedItemId, setSelectedItemId] = useState(itemId || items[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Display the only elected items' reviews
  const displayedReviews = itemId
    ? reviews.filter((r) => String(r.itemId) === String(itemId))
    : reviews;

  const targetItem = items.find((item) => String(item.id) === String(itemId || selectedItemId));

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      itemId: itemId || selectedItemId,
      itemName: targetItem ? targetItem.name : '',
      rating: Number(rating),
      comment: comment.trim(),
    });

    setComment('');
    setRating(5);
  };

  return (
    <section className="reviews-section" aria-label="Customer Reviews">
      <h2 className="reviews-headline">
        Customer Reviews {itemId && `(${displayedReviews.length})`}
      </h2>
      <ReviewHeader />
     
      {user ? (
        <div className="review-form-container">
          <h4 className="detail-sentence">
            {itemId && targetItem ? `Write a Review for ${targetItem.name}` : 'Write a Review'}
          </h4>
          <form onSubmit={handleReviewSubmit} className="account-form">
            
            {!itemId && (
              <div className="form-group">
                <label htmlFor="select-product">Select Item:</label>
                <select
                  id="select-product"
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="review-select"
                >
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} (${item.price})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label>Rating:</label>
              <StarRating rating={rating} onRate={(val) => setRating(val)} />
            </div>

            <div className="form-group">
              <label htmlFor="review-comment">Your Review:</label>
              <textarea
                id="review-comment"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this item."
                className="review-textarea"
              />
            </div>

            <button type="submit" className="btn-primary">
              Post Review
            </button>
          </form>
        </div>
      ) : (
        <div className="login-prompt">
          <p>Please log in to write or manage a review.</p>
        </div>
      )}

      <div className="reviews-grid review-list">
        {displayedReviews.length === 0 ? (
          <p>No reviews posted yet for this product.</p>
        ) : (
          displayedReviews.map((review) => {
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

                {!itemId && review.itemName && (
                  <div className="review-product-name">
                    Item: <strong>{review.itemName}</strong>
                  </div>
                )}

                <StarRating rating={review.rating} readOnly />
                <p className="review-comment">"{review.comment}"</p>

                {isOwner && (
                  <button
                    onClick={() => deleteReview(review.id)}
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

      <div className="reviews-cta">
        <Link to="/reviews" className="btn-secondary">
          Write or Manage Reviews →
        </Link>
      </div>
    </section>
  );
}

export default ReviewList;