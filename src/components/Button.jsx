const Button = ({ children, onClick, type = 'button', disabled = false, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: disabled
      ? 'bg-gray-400 text-white cursor-not-allowed'
      : 'bg-gradient-to-r from-school-blue to-blue-600 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-school-blue shadow-lg hover:shadow-xl',
    secondary: disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-school-orange text-white hover:bg-orange-600 focus:ring-school-orange shadow-lg hover:shadow-xl',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

