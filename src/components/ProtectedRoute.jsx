import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div className="loader"></div>;
  }

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
