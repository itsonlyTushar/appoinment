import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <section className="bg-surface w-full max-w-[400px] rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-body/10 p-8">

        <header className="text-center mb-6">

          <h1 className="text-2xl font-heading font-bold text-heading mb-1.5">Create Account</h1>
          <p className="text-body text-sm">Join us to manage your health seamlessly</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-heading">First Name</label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-heading">Last Name</label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-heading">Email Address</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-heading">Password</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-heading">Confirm Password</label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full py-2.5">
            Create Account
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-body/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface text-body/60">Or continue with</span>
          </div>
        </div>

        <Button type="button" variant="outline" className="w-full py-2.5 gap-3">
          <FcGoogle className="w-5 h-5" />
          Sign up with Google
        </Button>

        <p className="mt-8 text-center text-sm text-body">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
