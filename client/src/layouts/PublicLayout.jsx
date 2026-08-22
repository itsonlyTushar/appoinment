import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo/logo.png';
import Footer from '../components/Footer';

export default function PublicLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  
  // EXTRACT USER STATE FROM REDUX REDUCER
  const { userInfo } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  const isAuthenticated = Boolean(userInfo || token);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-surface/75 backdrop-blur-md border-b border-body/10 py-3 px-4 sm:px-6 md:px-12 flex items-center justify-between shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-colors duration-300">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="HealthEase" className="h-7 sm:h-8 md:h-9 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/services" className="text-xs sm:text-sm font-medium text-heading hover:text-primary transition-colors px-2.5 sm:px-3 py-2 rounded-lg hidden sm:inline-block">
            Services
          </Link>
          {/* AUTHENTICATED USERS WILL SEE BOOK APPOINTMENT OPTION INSTEAD LOGIN OPTION AND GET STARTED - REGISTER OPTION  */}
          {isAuthenticated ? (
            <Link to="/book" className="text-xs sm:text-sm font-medium bg-primary text-surface px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
              Book Appointment
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-xs sm:text-sm font-medium text-heading hover:text-primary transition-colors px-3 sm:px-4 py-2 rounded-lg">
                Sign In
              </Link>
              <Link to="/register" className="text-xs sm:text-sm font-medium bg-primary text-surface px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className={`flex-grow ${isLanding ? 'pt-0' : 'pt-16'}`}>
        <Outlet />
      </main>

      {/* PUBLIC FOOTER */}
      <Footer />
    </div>
  );
}
