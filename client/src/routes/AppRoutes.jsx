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

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/services' element={<Services />} />
      </Route>

      {/* Auth / Private Routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path='/book' element={<Booking />} />
        <Route path='/appointment' element={<Appointment />} />
      </Route>
    </Routes>
  );
}
