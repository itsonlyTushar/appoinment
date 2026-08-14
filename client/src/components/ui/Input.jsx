import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Input({ className = '', type = 'text', ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  if (type === 'password') {
    return (
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : 'password'}
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

  return (
    <input
      type={type}
      className={`w-full px-4 py-2.5 rounded-lg border border-body/20 bg-background focus:bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-heading placeholder:text-body/60 ${className}`}
      {...props}
    />
  );
}
