import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';

function Account() {
  const { user, updateUser } = useAuth();
  const { reviews, addReview, deleteReview } = useReviews();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // When user state changes, formData will be synchronised.
  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  // In case of not-lgin
  if (!user) {
    return (
      <div className="account-container">
        <h1>Account Settings</h1>
        <p>Please log in to view your account settings.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditStart = () => {
    setFormData({ ...user });
    setIsEditing(true);
  };
  

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
    alert('Please enter a valid review comment.');
    return;
  }

    addReview({
      name: user.name || user.email || 'Anonymous',
      rating: Number(rating),
      comment,
    });

    // Clear form after adding reviews
    setComment('');
    setRating(5);
  };

  return (
    <div className="account-container">
      <h1>Account Settings</h1>
      <p>Manage your account details and view your recent orders.</p>

      <div className="account-details">
        <h3>Personal Details</h3>

        {isEditing ? (
          <form onSubmit={handleProfileSubmit} className="account-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Preferred Delivery Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions mt-10">
              <button type="submit" className="btn-account">
                Save Changes
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Preferred Delivery Address:</strong> {user.address}</p>
            <button className="btn-account" onClick={handleEditStart}>
              Edit Profile
            </button>
          </>
        )}
      </div>

      <div className="account-details">
        <h3>Order History</h3>
        <p>You have no recent orders to display.</p>
      </div>

      <div className="account-details">
        <h3>My Reviews & Feedback</h3>
        <div className="review-form-container">
          <h4>Write a New Review</h4>
          <form onSubmit={handleReviewSubmit} className="account-form">
            <div className="form-group">
              <label htmlFor="rev-rating">Rating:</label>
              <select
                id="rev-rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="review-select"
              >
                <option value="5">★★★★★ (5/5)</option>
                <option value="4">★★★★☆ (4/5)</option>
                <option value="3">★★★☆☆ (3/5)</option>
                <option value="2">★★☆☆☆ (2/5)</option>
                <option value="1">★☆☆☆☆ (1/5)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rev-comment">Your Review:</label>
              <textarea
                id="rev-comment"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about our products or service..."
                required
                className="review-textarea"
              />
            </div>

            <button type="submit" className="btn-account">
              Post Review
            </button>
          </form>
        </div>

        <div>
          <h4>All Posted Reviews ({reviews.length})</h4>
          {reviews.length === 0 ? (
            <p>No reviews have been posted yet.</p>
          ) : (
            <div className="review-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-card-header">
                    <strong>{review.name}</strong>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-rating-stars">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="btn-delete-review"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;