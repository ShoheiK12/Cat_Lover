import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ display: 'flex', gap: '15px', padding: '15px', background: '#f5f5f5' }}>
      <h2>🐾 cat-lover</h2>
      <nav style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Link to="/">Home</Link>
        <Link to="/about">Company Information</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Shopping Cart</Link>
        <Link to="/account">Account Settings</Link>
      </nav>
    </header>
  );
}