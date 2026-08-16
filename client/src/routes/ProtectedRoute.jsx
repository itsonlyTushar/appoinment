import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// PROTECTED ROUTE - STANDS BETWEEN LOGIN USERS AND NOT LOGGED IN
export default function ProtectedRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();


  const token = localStorage.getItem('token');
  const isAuthenticated = Boolean(userInfo || token);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />
  }
}
