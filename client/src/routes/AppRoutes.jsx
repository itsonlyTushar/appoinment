import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import PageLoader from '../components/ui/PageLoader';

// LAZY LOADED PAGE COMPONENTS
const Landing = lazy(() => import('../pages/Landing'));
const Services = lazy(() => import('../pages/Services'));
const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Booking = lazy(() => import('../pages/Booking'));
const Appointment = lazy(() => import('../pages/Appointment'));
const Profile = lazy(() => import('../pages/Profile'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('../pages/TermsOfService'));
const NotFound = lazy(() => import('../pages/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* PUBLIC PAGES LAYOUT */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          {/* 404 NOT FOUND CATCH-ALL */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* PRIVATE ROUTES PROTECTED BY PROTECTED ROUTE */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/appointment" element={<Appointment />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}


