import { useState } from 'react';
import { Link } from 'react-router-dom';
import { items } from '../data/items';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function Home() {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
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

  return (
    <div className="page-container">
      <h1>Our Products</h1>
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
              <p className="price">¥{item.price.toLocaleString()}</p>
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
    </div>
  );
}

export default Home;