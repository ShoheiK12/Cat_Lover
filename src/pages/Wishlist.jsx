import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="page-container">
        <h2>Your Wishlist is Empty</h2>
        <p>No favorite items saved yet.</p>
        <Link to="/">Explore Items</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>My Wishlist ({wishlist.length})</h2>
      <div className="item-grid">
        {wishlist.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <Link to={`/items/${item.id}`} className="btn-secondary">View Detail</Link>
            <button onClick={() => toggleWishlist(item)} className="btn-remove">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;