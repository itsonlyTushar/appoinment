import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import { PiSpinnerGap } from 'react-icons/pi';
import { toast } from 'react-toastify';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { userLogin } from '../features/actions/authActions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const savedEmail = localStorage.getItem('rememberedEmail') || '';

  // INITIALIZATION FOR FORM STATE, VALIDATION, AND SUBMISSION HANDLING
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: savedEmail,
      password: '',
      rememberMe: Boolean(savedEmail),
    },
  });

  // HANDLE USER LOGIN FORM SUBMISSION
  const onSubmit = async (data) => {
    const { email, password, rememberMe } = data;
    try {
      const res = await dispatch(userLogin({ email, password }));
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      if (res?.token) {
        localStorage.setItem('token', res.token);
        if (res?.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
        }
      }
      toast.success(res?.message || 'Logged in successfully!');
      navigate('/profile');
    } catch (err) {
      console.error('Error in login', err);
      const errorMessage =
        err?.response?.data?.message || err?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <section className="bg-surface w-full max-w-100 rounded-2xl border border-body/10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8">

        <header className="text-center mb-6">
          <h1 className="text-2xl font-heading font-bold text-heading mb-1.5">Patient Login</h1>
          <p className="text-body text-sm">Sign in to manage your appointments</p>
        </header>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-heading">Email Address</label>
            <Input
              type="email"
              placeholder="john.doe@example.com"
              error={!!errors.email}
              {...register('email', {
                required: 'Email is required',
                validate: (value) => value.trim() !== '' || 'Please enter a valid email',
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-heading">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              error={!!errors.password}
              {...register('password', {
                required: 'Password is required',
                validate: (value) => value.trim() !== '' || 'Please enter a valid password',
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <label htmlFor="rememberMe" className="flex items-center gap-2 cursor-pointer select-none">
              <Input
                type="checkbox"
                id="rememberMe"
                {...register('rememberMe')}
              />
              <span className="text-sm text-body hover:text-heading transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
          </div>

          <Button type="submit" disabled={loading} className="w-full py-2.5 disabled:opacity-70 gap-2">
            {loading ? (
              <>
                <PiSpinnerGap className="animate-spin text-lg" />
                <span>Signing In</span>
              </>
            ) : (
              'Sign In'
            )}
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
          Sign in with Google
        </Button>

        <p className="mt-8 text-center text-sm text-body">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Create account
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
