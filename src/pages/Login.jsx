import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // Obtain location info from ProtectedRoute.
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pseudo login process
    login({
      name: 'Oliver Smith',
      email: formData.email || 'oliver@example.co.uk',
      address: '10 High Street, Sydney, NSW 2000',
    });
    
    showToast('Logged in successfully!', 'success');

    // Navigate to the page where user wanna go before login.
    navigate(from, { replace: true });
  };

  return (
    <div className="account-container">
      <h1>Login</h1>
      <p>Please enter your email and password to log in.</p>

      <form onSubmit={handleSubmit} className="account-form">
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@domain.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="form-actions mt-10">
          <button type="submit" className="btn-account">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;