import { useState } from 'react';
import { Link } from 'react-router-dom';
import { items } from '../data/items';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import { StarRating } from '../components/StarRating';
import { ReviewHeader } from '../components/ReviewHeader'; 

function Features() {
  const featureList = [
    {
      icon: '🌿',
      title: '100% Organic & Safe',
      description: 'Carefully selected, non-toxic materials for your cat’s health and happiness.',
    },
    {
      icon: '🚚',
      title: 'Fast & Free Delivery',
      description: 'Free standard shipping on all orders over $50 with real-time tracking.',
    },
    {
      icon: '🐾',
      title: 'Cat Approved Quality',
      description: 'Every product is tested and loved by thousands of happy feline friends.',
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Our dedicated team is always here to assist you and your furry companions.',
    },
  ];

  return (
    <section className="features-section" aria-label="Why Choose Us">
      <div className="features-header">
        <h2>Why Choose Us</h2>
        <p>Providing the very best for your beloved feline family members.</p>
      </div>
      <div className="features-grid">
        {featureList.map((feature, index) => (
          <div key={index} className="feature-card">
            <span className="feature-icon">{feature.icon}</span>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  const { user } = useAuth();
  const { reviews, addReview, deleteReview } = useReviews();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [selectedItemId, setSelectedItemId] = useState(items[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const handleAddToCart = (item) => {
    addToCart(item);
    showToast(`Added "${item.name}" to your cart!`);
  };

  const categories = ['All', ...new Set(items.map((item) => item.category))];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Please enter a valid comment.');
      return;
    }

    const selectedItem = items.find((item) => String(item.id) === String(selectedItemId));

    addReview({
      userId: user?.id || user?.email,
      name: user?.name || user?.email || 'Anonymous',
      itemId: selectedItem?.id || '',
      itemName: selectedItem?.name || '',
      rating: Number(rating),
      comment,
      date: new Date().toLocaleDateString(),
    });

    setComment('');
    setRating(5);
    showToast('Review submitted successfully!');
  };

  const handleDeleteReview = (reviewId) => {
    deleteReview(reviewId);
    showToast('Review deleted.');
  };

  return (
    <div className="page-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Premium Comfort for Your Feline Friends 🐾</h1>
          <p>Discover high-quality toys, food, and cozy accessories crafted with love.</p>
          <a href="#products-section" className="btn-primary hero-btn">
            Explore Shop
          </a>
        </div>
      </section>

      <Features />
      
      <section id="products-section" className="products-section">
        <h1>Goods for cat lovers</h1>
        <p>Explore our range of favourite items for your feline companions.</p>

        <div className="filter-container">
          <div className="search-box">
            <label htmlFor="search">Search Products</label>
            <input
              type="text"
              id="search"
              className="search-input"
              placeholder="e.g. Grass, Hammock..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-box">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="no-results">
            <h3>No items found</h3>
            <p>Please try a different search term or change the category filter.</p>
          </div>
        ) : (
          <div className="item-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="item-card">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p className="price">${item.price.toLocaleString()}</p>
                <div className="card-buttons">
                  <Link to={`/items/${item.id}`} className="btn-detail">
                    View Details
                  </Link>
                  <button
                    className="btn-primary"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
      <section className="reviews-section">
        <h2>Customer Reviews</h2>
        <ReviewHeader />

        {user ? (
          <div className="review-form-container">
            <h4>Write a Review</h4>
            <form onSubmit={handleReviewSubmit} className="account-form">
              <div className="form-group">
                <label htmlFor="select-product">Select Product:</label>
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

              <div className="form-group">
                <label>Rating:</label>
                <StarRating rating={rating} onRate={(val) => setRating(val)} />
              </div>

              <div className="form-group">
                <label htmlFor="home-rev-comment">Your Review:</label>
                <textarea
                  id="home-rev-comment"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
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
            <p>Want to leave or manage a review? Please log in to your account.</p>
          </div>
        )}

        <div className="review-list">
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
                <div key={review.id} className="review-card">
                  <div className="review-card-header">
                    <strong>{review.name}</strong>
                    <span className="review-date">{review.date}</span>
                  </div>

                  {review.itemName && (
                    <div className="review-product-name">
                      Product: <strong>{review.itemName}</strong>
                    </div>
                  )}

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
      </section>
      
    </div>
  );
}

export default Home;