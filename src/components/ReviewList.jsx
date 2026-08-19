import { Link } from 'react-router-dom';
import { useReviews } from '../context/ReviewContext';

function ReviewList() {
  const { reviews } = useReviews();

  return (
    <section className="reviews-section" aria-label="Customer Reviews">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <p>Real feedback from cat lovers around the world 🐾</p>
      </div>

      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-card-header">
              <span className="review-author">{review.name}</span>
              <span className="review-date">{review.date}</span>
            </div>
            <div className="review-stars">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <p className="review-comment">"{review.comment}"</p>
          </div>
        ))}
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