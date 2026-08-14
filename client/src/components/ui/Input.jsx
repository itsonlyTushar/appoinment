export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-4 py-2.5 rounded-lg border border-body/20 bg-background focus:bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-heading placeholder:text-body/60 ${className}`}
      {...props}
    />
  );
}
