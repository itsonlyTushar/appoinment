import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { PiSpinnerGap } from 'react-icons/pi';
import { toast } from 'react-toastify';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { registerGoogle } from '../api/auth.api';
import { registerFields } from '../constants/fields/register';
import { userRegistration } from '../features/actions/authActions';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // INITIALIZATION FOR FORM STATE, VALIDATION, AND SUBMISSION HANDLING
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // HANDLE USER REGISTRATION FORM SUBMISSION
  const onSubmit = async (data) => {
    const payload = { ...data };
    delete payload.confirmPassword;
    try {
      const res = await dispatch(userRegistration(payload));
      if (res?.token) {
        localStorage.setItem('token', res.token);
        if (res?.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
        }
      }
      toast.success(res?.message || 'Account created successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error in registration', error);
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  // HANDLE GOOGLE AUTHENTICATION 
  const handleGoogleAuth= async ({ credential }) => {
    try {
      const res = await registerGoogle({ token: credential });
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      toast.success(res.message || 'Account created successfully!');
      navigate('/profile');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Google registration failed.');
    }
  };

  const password = watch('password');

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <section className="bg-surface w-full max-w-[400px] rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-body/10 p-8">

        <header className="text-center mb-4">
          <h1 className="text-2xl font-heading font-bold text-heading mb-1.5">Patient Registration</h1>
          <p className="text-body text-sm">Register yourself as a patient</p>
        </header>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* REGISTRATION FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-y-4 gap-x-3">

          {/* LOAD INPUT FIELDS  - from register.js*/}
          {registerFields.map((field) => (
            <div key={field.name} className={`space-y-1.5 ${field.halfWidth ? 'col-span-1' : 'col-span-2'}`}>
              <label className="text-sm font-medium text-heading">{field.label}</label>
              <Input
                type={field.type}
                placeholder={field.placeholder}
                error={!!errors[field.name]}
                {...register(field.name, {
                  required: field.required,
                  validate: field.name === 'confirmPassword'
                    ? (value) => {
                      if (value.trim() === '') return field.invalidMessage;
                      if (value !== password) return 'Passwords do not match';
                      return true;
                    }
                    : (value) => value.trim() !== '' || field.invalidMessage,
                })}
              />
              {errors[field.name] && (
                <p className="text-sm text-red-500">{errors[field.name].message}</p>
              )}
            </div>
          ))}

          <div className="col-span-2">
            <Button type="submit" disabled={loading} className="w-full py-2.5 mt-1 disabled:opacity-70 gap-2">
              {loading ? (
                <>
                  <PiSpinnerGap className="animate-spin text-lg" />
                  <span>Creating Account</span>
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </div>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-body/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface text-body/60">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleAuth}
            onError={() => toast.error('Google registration failed.')}
            text="signup_with"
            width="320"
          />
        </div>

        <p className="mt-4 text-center text-sm text-body">
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
