import { useState } from 'react';
import { Link } from 'react-router-dom';
import { items } from '../data/items';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import { StarRating } from '../components/StarRating';
import ReviewList from '../components/ReviewList';
import AverageRating from '../../utils/reviewUtils';

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
        <h2 className='features-headline'>Why Choose Us</h2>
        <p>Providing the best items for your beloved feline family members.</p>
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
          <h1 className='hero-headline'>Premium Comfort for Your Feline Friends 🐾</h1>
          <p>Discover high-quality toys, food, and cozy accessories crafted with love.</p>
          <a href="#products-section" className="btn-primary hero-btn">
            Explore Shop
          </a>
        </div>
      </section>

      <Features />
      
      <section id="products-section" className="products-section">
        <h1 className='products-headline'>Items for cat lovers</h1>
        <p className='directions'>Explore our range of favourite items for your feline companions.</p>

        <div className="filter-container">
          <div className="search-box">
            <label htmlFor="search">Search Items</label>
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
            {filteredItems.map((item) => {
            const { average, count } = AverageRating(reviews, item.id);

            return (
              <div key={item.id} className="item-card">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>

                <div className="card-rating">
                  <StarRating rating={Math.round(average)} readOnly />
                  <span className="rating-count">
                    {count > 0 ? `${average} (${count})` : 'New'}
                  </span>
                </div>

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
            );
           })}
          </div>
        )}
      </section>
      
      <ReviewList />
      
    </div>
  );
}

export default Home;