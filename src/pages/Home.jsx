import { Link } from 'react-router-dom';
import { items } from '../data/items';

function Home() {
  return (
    <div>
      <h1>Items</h1>
      <div>
        {items.map((item) => (
          <div key={item.id} className='item-card'>
            <img src={item.image} alt={item.name}/>
            <h3>{item.name}</h3>
            <p>${item.price.toLocaleString()}</p>
            
            <Link to={`/items/${item.id}`} className="btn-detail">
              Check item detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;