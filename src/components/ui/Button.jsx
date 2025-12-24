const Button = ({ children, size = "md", variant = "primary", className = "", ...props }) => {
	const sizeClasses = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-base",
		lg: "px-8 py-4 text-lg",
	};

	const variantClasses = {
		primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
		secondary: "bg-white text-foreground border border-border hover:bg-muted",
		outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10"
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