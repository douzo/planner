import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  icon = null
}) => {
  const baseClasses = 'rounded-ios font-medium transition-all duration-200 flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-ios-blue text-white hover:opacity-90 active:opacity-80 shadow-sm',
    secondary: 'bg-neutral-bg-secondary text-neutral-text-primary hover:bg-gray-200 active:bg-gray-300',
    danger: 'bg-ios-red text-white hover:opacity-90 active:opacity-80',
    ghost: 'bg-transparent text-ios-blue hover:bg-neutral-bg-secondary'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
