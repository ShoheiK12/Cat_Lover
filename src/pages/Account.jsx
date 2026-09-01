import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import { ReviewHeader } from '../components/ReviewHeader';
import { useToast } from '../context/ToastContext';
import { StarRating } from '../components/StarRating';

function Account() {
  const { user, updateUser } = useAuth();
  const { reviews, addReview, deleteReview } = useReviews();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  // Display only reviews of only log-in user.
  const myReviews = reviews.filter(
  (review) =>
    (review.userId && String(user?.id || user?.email) === String(review.userId)) ||
    review.name === user?.name ||
    review.name === user?.email
);

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
    addToast('Profile updated successfully!', 'success');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      addToast('Please enter a valid review comment.', 'error');
      return;
    }

    addReview({
      userId: user?.id || user?.email,
      name: user.name || user.email || 'Anonymous',
      rating: Number(rating),
      comment,
      date: new Date().toLocaleDateString(),
    });

    // Clear form after adding reviews
    setComment('');
    setRating(5);
    addToast('Review posted successfully!', 'success');
  };
  
  const handleDeleteReview = (reviewId) => {
    deleteReview(reviewId);
    addToast('Review deleted.', 'info'); 
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
        <h3>My Reviews</h3>
        <div className="review-form-container">
          <h4>Write a New Review</h4>
          <form onSubmit={handleReviewSubmit} className="account-form">
            <div className="form-group">
              <label>Rating:</label>
              <StarRating rating={rating} onRate={(val) => setRating(val)} />
            </div>

            <div className="form-group">
              <label htmlFor="rev-comment">Your Review:</label>
              <textarea
                id="rev-comment"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about our products or service..."
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
          
          <ReviewHeader />
          
          {reviews.length === 0 ? (
            <p>You have not posted any reviews yet.</p>
          ) : (
            <div className="review-list">
              {myReviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-card-header">
                    <strong>{review.name}</strong>
                    <span className="review-date">{review.date}</span>
                  </div>

                  <StarRating rating={review.rating} readOnly />

                  <p className="review-comment">{review.comment}</p>

                  <button
                    onClick={() => handleDeleteReview(review.id)}
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