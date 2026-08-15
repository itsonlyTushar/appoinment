import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// PUBLIC ROUTE - TO PREVENT LOGGED IN USERS TO ACCESS LOGIN AND REGISTER
export default function PublicRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  const isAuthenticated = Boolean(userInfo || token);

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  } else {
    return <Outlet />
  }
}
