import { useState, forwardRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = forwardRef(function Input({ className = '', type = 'text', id, ...props }, ref) {
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

  if (type === 'password') {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          id={id}
          className={`w-full px-4 py-2.5 rounded-lg border border-body/20 bg-background focus:bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-heading placeholder:text-body/60 pr-10 ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-body/60 hover:text-heading transition-colors focus:outline-none"
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
        className={`w-full px-4 py-2.5 rounded-lg border border-body/20 bg-background focus:bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-heading placeholder:text-body/60 resize-none ${className}`}
        {...props}
      />
    );
  }

  return (
    <input
      ref={ref}
      type={type}
      id={id}
      className={`w-full px-4 py-2.5 rounded-lg border border-body/20 bg-background focus:bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-heading placeholder:text-body/60 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 ${className}`}
      {...props}
    />
  );
});

export default Input;
