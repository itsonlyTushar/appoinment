import { useState, forwardRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = forwardRef(function Input(
  { className = '', type = 'text', id, error, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  if (type === 'checkbox' || type === 'radio') {
    return (
      <input
        ref={ref}
        type={type}
        id={id}
        className={`w-4 h-4 rounded border-body/30 text-primary accent-primary cursor-pointer transition-colors ${className}`}
        {...props}
      />
    );
  }

  const borderClass = error ? 'border-red-500' : 'border-body/20';
  const baseInputClass = `w-full px-4 py-2.5 text-sm rounded-lg border ${borderClass} bg-background focus:bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-heading placeholder:text-body/60 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-body/5 disabled:border-body/10`;

  if (type === 'password') {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          id={id}
          className={`h-11 ${baseInputClass} pr-10 ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-body/60 hover:text-heading transition-colors focus:outline-none cursor-pointer"
        >
          {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <textarea
        ref={ref}
        id={id}
        rows={4}
        className={`${baseInputClass} resize-none ${className}`}
        {...props}
      />
    );
  }

  return (
    <input
      ref={ref}
      type={type}
      id={id}
      className={`h-11 ${baseInputClass} [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 ${className}`}
      {...props}
    />
  );
});

export default Input;
