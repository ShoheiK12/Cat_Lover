import { Link } from 'react-router-dom';
import { items } from '../data/items';

function Home() {
  return (
    <div>
      <h1>Items</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              width: '220px'
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            <h3>{item.name}</h3>
            <p>¥{item.price.toLocaleString()}</p>
            
            <Link
              to={`/items/${item.id}`}
              style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '8px 12px',
                background: '#0284c7',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              Check item detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;