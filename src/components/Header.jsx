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

        {user ? (
          <Link to="/account">Account Settings</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}

        {/* 6番目 (120px): ログイン状況で切り替え（未ログイン時は空のspanで枠をキープ） */}
        {user ? (
          <Link to="/login" onClick={logout}>
            Logout
          </Link>
        ) : (
          <span className="nav-placeholder"></span>
        )}
  
        
        <div className="animation start-home"></div>
      </nav>
    </header>
  );
}