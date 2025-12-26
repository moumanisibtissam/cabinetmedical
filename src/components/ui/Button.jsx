const Button = ({
  children,
  size = "md",
  variant = "primary",
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-[#006d77] text-white hover:bg-[#005f66] shadow-lg hover:shadow-xl",
    secondary:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
    outline:
      "bg-transparent border-2 border-[#006d77] text-[#006d77] hover:bg-[#006d77]/10",
  };

  return (
    <button
      className={`rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;