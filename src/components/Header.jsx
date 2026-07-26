import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <h2>🐾 Cat Lover</h2>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/about">Company Information</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Shopping Cart</Link>
        <Link to="/account">Account Settings</Link>
      </nav>
    </header>
  );
}