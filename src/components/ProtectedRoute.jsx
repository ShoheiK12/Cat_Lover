import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // If not log in yet, redirect to /login.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If already log in, display children.
  return children;
}

export default ProtectedRoute;