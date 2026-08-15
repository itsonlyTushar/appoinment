export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 cursor-pointer";

  const variants = {
    primary: "bg-primary text-surface hover:bg-primary/90",
    outline: "bg-surface border border-body/20 text-heading hover:bg-background",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


