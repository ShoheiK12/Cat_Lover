import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  
  return (
    <header className="header">
      <h2>🐾 Cat Lover</h2>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Shopping Cart</Link>
        <Link to="/account">Account Settings</Link>
        {/* Login -> Account setting page, Not-Login -> Login link*/}
        {user ? (
          <>
            <Link to="/account">Account Settings</Link>
            <button className="btn-logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <div className="animation start-home"></div>
      </nav>
    </header>
  );
}