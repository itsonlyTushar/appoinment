import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { PiSpinnerGap } from 'react-icons/pi';
import { toast } from 'react-toastify';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { userLogin } from '../features/actions/authActions';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { handleGoogleAuth } = useGoogleAuth();

  // GET SAVED MAIL AND LAST USED METHOD FROM LOCAL STORAGE
  const savedEmail = localStorage.getItem('rememberedEmail') || '';

  // GET WHAT LAST METHOD DID USER USED FOR LOGIN FROM LOCAL STORAGE 
  const lastLoginMethod = localStorage.getItem('lastLoginMethod') || '';

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
      localStorage.setItem('lastLoginMethod', 'email');
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
      navigate('/dashboard');
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err?.message;
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

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-heading">Email Address</label>
            {/* LAST USED UTILTY OPTION FOR USER  */}
            <div className="relative">
              {lastLoginMethod === 'email' && (
                <span className="absolute -top-3 right-3 z-10 text-[10px] font-semibold text-heading bg-surface px-2.5 py-0.5 rounded-md border border-heading/30 shadow-xs">
                  Last Used
                </span>
              )}
              <Input
                type="email"
                placeholder="john.doe@example.com"
                error={!!errors.email}
                {...register('email', {
                  required: 'Email is required',
                  validate: (value) => value.trim() !== '' || 'Please enter a valid email',
                })}
              />
            </div>
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

          <div className="flex items-center pt-1">
            <label htmlFor="rememberMe" className="flex items-center gap-2 cursor-pointer select-none">
              <Input
                type="checkbox"
                id="rememberMe"
                {...register('rememberMe')}
              />
              <span className="text-sm text-body hover:text-heading transition-colors">Remember me</span>
            </label>
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

        <div className="relative my-4 flex items-center justify-center gap-2">
          <span className="px-2 bg-surface text-body/60 text-sm">Or continue with</span>
        </div>

        <div className="flex justify-center">
          {/* EMBED GOOGLE LOGIN BUTTON  */}
          <div className="relative inline-flex">
            {/* LAST USED UTILTY OPTION FOR USER  */}
            {lastLoginMethod === 'google' && (
              <span className="absolute -top-3 right-3 z-10 text-[10px] font-semibold text-heading bg-surface px-2.5 py-0.5 rounded-md border border-heading/30 shadow-xs">
                Last Used
              </span>
            )}
            <GoogleLogin
              onSuccess={handleGoogleAuth}
              onError={() => toast.error('Google login failed.')}
              text="signin_with"
              width="320"
            />
          </div>
        </div>

        <p className="mt-8 text-center mr-1 text-sm text-body">
          <span className='mr-1'>Don't have an account?</span>
          <Link to="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Create account
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
