import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute: React.FC = () => {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
