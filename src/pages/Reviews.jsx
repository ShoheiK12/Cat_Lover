import { useState } from 'react';
import { items } from '../data/items';
import { useReviews } from '../context/ReviewContext';
import { ReviewHeader } from '../components/ReviewHeader';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

function Reviews() {
  const { user } = useAuth();
  const { reviews, addReview, deleteReview } = useReviews();
  const { addToast } = useToast();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(items[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      addToast('Please enter a review comment.', 'error');
      return;
    }
    if (!selectedItemId) {
      addToast('Please select a product.', 'error');
      return;
    }
    
    const selectedItem = items.find((item) => String(item.id) === String(selectedItemId));

    addReview({
      userId: user?.id || user?.email,
      name: user?.name || user?.email || 'Anonymous',
      itemId: selectedItem?.id || '',
      itemName: selectedItem?.name || '',
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toLocaleDateString(),
    });

    // Reset form
    setRating(5);
    setComment('');
    setSelectedItemId(items[0]?.id || '');
    addToast('Review posted successfully!', 'success');
  };

  const handleDelete = (reviewId) => {
    deleteReview(reviewId);
    addToast('Review deleted.', 'info');
  };
  
  return (
    <div className="page-container">
      <h1>Reviews & Feedback</h1>
      <p className="page-subtitle">Manage customer reviews or share your experience with us.</p>

      <div className="reviews-manage-layout">
        <div className="review-form-container">
          <h2>Write a Review</h2>
          {user ? (
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label htmlFor="select-product">Select Product</label>
                <select
                  id="select-product"
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="review-select"
                  required
                >
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} (${item.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rev-rating">Rating</label>
                <select
                  id="rev-rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value="4">⭐⭐⭐⭐☆ (4/5)</option>
                  <option value="3">⭐⭐⭐☆☆ (3/5)</option>
                  <option value="2">⭐⭐☆☆☆ (2/5)</option>
                  <option value="1">⭐☆☆☆☆ (1/5)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rev-comment">Comment</label>
                <textarea
                  id="rev-comment"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review here..."
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                Submit Review
              </button>
            </form>
          ) : (
            <div className="login-prompt">
              <p>Please log in to your account to write or manage reviews.</p>
            </div>
          )}
        </div>

        <div className="review-manage-list">
          <h2>Existing Reviews</h2>
          
          <ReviewHeader />
          
          {reviews.length === 0 ? (
            <p>No reviews posted yet.</p>
          ) : (
            reviews.map((review) => {
              const isOwner =
                user &&
                ((review.userId && String(user.id || user.email) === String(review.userId)) ||
                  user.name === review.name ||
                  user.email === review.name);

              return (
                <div key={review.id} className="review-manage-card">
                  <div className="review-manage-meta">
                    <strong>{review.name}</strong>
                    <span>{review.date}</span>
                  </div>

                  {review.itemName && (
                    <div className="review-product-name">
                      Product: <strong>{review.itemName}</strong>
                    </div>
                  )}

                  <div className="review-stars">
                    {'⭐'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>

                  <p>"{review.comment}"</p>
                  
                  {isOwner && (
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="btn-delete"
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

export default Reviews;