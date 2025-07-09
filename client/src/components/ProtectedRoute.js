
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user, isLoading } = useContext(AuthContext);

  console.log('ProtectedRoute: Rendering with user:', user, 'isLoading:', isLoading);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-4 bg-gray-200 text-gray-700">
        กำลังโหลด...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;