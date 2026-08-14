import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <nav className="w-full bg-surface border-b border-body/10 py-4 px-6 md:px-12 flex items-center justify-between shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
        <Link to="/" className="text-xl font-heading font-bold text-primary">
          DocAppoint
        </Link>
        <div className="flex gap-3">
          <Link to="/login" className="text-sm font-medium text-heading hover:text-primary transition-colors px-4 py-2 rounded-lg">
            Sign In
          </Link>
          <Link to="/register" className="text-sm font-medium bg-primary text-surface px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
