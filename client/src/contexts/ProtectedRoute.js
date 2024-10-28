import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from './AppContext'; 

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
