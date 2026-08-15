import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Landing from '../pages/Landing';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import Profile from '../pages/Profile';
import Services from '../pages/Services';
import Appointment from '../pages/Appointment';
import Booking from '../pages/Booking';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC PAGES LAYOUT */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={<Services />} />
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>

      {/* PRIVATE ROUTES PROTECTED BY PROTECTED ROUTE */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/appointment" element={<Appointment />} />
        </Route>
      </Route>
    </Routes>
  );
}

