import { useState } from 'react';
import { useReviews } from '../context/ReviewContext';
import { ReviewHeader } from '../components/ReviewHeader';

function Reviews() {
  const { reviews, addReview, deleteReview } = useReviews();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview({
      name,
      rating: Number(rating),
      comment,
    });

    setName('');
    setRating(5);
    setComment('');
  };

  return (
    <div className="page-container">
      <h1>Reviews & Feedback</h1>
      <p className="page-subtitle">Manage customer reviews or share your experience with us.</p>

      <div className="reviews-manage-layout">
        <div className="review-form-container">
          <h2>Write a Review</h2>
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label htmlFor="rev-name">Your Name</label>
              <input
                id="rev-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rev-rating">Rating</label>
              <select
                id="rev-rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="5">★★★★★ (5/5)</option>
                <option value="4">★★★★☆ (4/5)</option>
                <option value="3">★★★☆☆ (3/5)</option>
                <option value="2">★★☆☆☆ (2/5)</option>
                <option value="1">★☆☆☆☆ (1/5)</option>
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
        </div>

        <div className="review-manage-list">
          <h2>Existing Reviews</h2>
          
          <ReviewHeader />
          
          {reviews.map((review) => (
            <div key={review.id} className="review-manage-card">
              <div className="review-manage-meta">
                <strong>{review.name}</strong> - <span>{review.date}</span>
                <div className="review-stars">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p>"{review.comment}"</p>
              <button
                onClick={() => deleteReview(review.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;