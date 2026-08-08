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
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  
  // Form validation
  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'email') {
      if (!value.trim()) {
        errorMsg = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = 'Please enter a valid email address (e.g. name@example.com).';
      }
    }

    if (name === 'password') {
      if (!value) {
        errorMsg = 'Password is required.';
      } else if (value.length < 6) {
        errorMsg = 'Password must be at least 6 characters.';
      }
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Live error validation when changing input
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  // Validate field when input loses focus
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };
  
  // Obtain location info from ProtectedRoute.
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check validation of all fields before submitting.
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);

    // If error is found, block submitting.
    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      showToast('Please fix the errors before submitting.');
      return;
    }

    // Pseudo login process using entered email address
    login({
      name: 'Oliver Smith',
      email: formData.email,
      address: '10 George Street, Sydney, NSW 2000',
    });

    showToast('Logged in successfully!');
    
    // Navigate to the page where user wanna go before login.
    navigate(from, { replace: true });
  };
  

  return (
    <div className="account-container">
      <h1>Login</h1>
      <p>Please enter your email and password to log in.</p>

      <form onSubmit={handleSubmit} className="account-form" noValidate>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="oliver@example.com"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="••••••••"
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
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