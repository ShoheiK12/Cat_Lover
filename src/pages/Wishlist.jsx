import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import EmptyState from '../components/EmptyState';

function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="page-container">
        <h2 className="wishlist-headline">My Wishlist</h2>
        <EmptyState
          icon="💖"
          title="Your wishlist is empty"
          message="Save your favourite cat items here by clicking the heart icon on any product."
          buttonText="Explore Items"
          buttonLink="/"
        />
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className='wishlist-headline'>My Wishlist ({wishlist.length})</h2>
      <div className="item-grid">
        {wishlist.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <Link to={`/items/${item.id}`} className="btn-detail">View Detail</Link>
            <button onClick={() => toggleWishlist(item)} className="btn-danger">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;