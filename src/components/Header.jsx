import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function Header() {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  
  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'info');
  };
  
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

        {user ? (
          <Link to="/login" onClick={handleLogout}>
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

export default Header;