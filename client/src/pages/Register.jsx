import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { registerFields } from '../constants/fields/register';
import { useRegister } from '../hooks/mutations/useAuthMutate';

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useRegister();

  const onSubmit = (data) => {
    const { confirmPassword, ...payload } = data;
    mutate(payload, {
      onSuccess: (res) => {
        console.log('Registration successful!', res);
        // Optionally redirect or show success message here
      },
      onError: (err) => {
        console.error('Registration failed:', err);
      },
    });
  };

  const password = watch('password');

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <section className="bg-surface w-full max-w-[400px] rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-body/10 p-8">

        <header className="text-center mb-6">

          <h1 className="text-2xl font-heading font-bold text-heading mb-1.5">Create Account</h1>
          <p className="text-body text-sm">Join us to manage your health seamlessly</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-y-4 gap-x-3">
          {registerFields.map((field) => (
            <div key={field.name} className={`space-y-1.5 ${field.halfWidth ? 'col-span-1' : 'col-span-2'}`}>
              <label className="text-sm font-medium text-heading">{field.label}</label>
              <Input
                type={field.type}
                placeholder={field.placeholder}
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
            <Button type="submit" disabled={isPending} className="w-full py-2.5 mt-1 disabled:opacity-70">
              {isPending ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
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
