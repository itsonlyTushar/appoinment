import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Landing from '../pages/Landing';
import PublicLayout from '../layouts/PublicLayout';
import Profile from '../pages/Profile';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Auth Routes  */}
      <Route path='/profile' element={<Profile />} />
    </Routes>
  );
}
