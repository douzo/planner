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
  // Define styles with explicit colors as fallback
  const variantStyles = {
    primary: {
      backgroundColor: '#007AFF',
      color: '#FFFFFF',
      border: 'none',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    secondary: {
      backgroundColor: '#F3F4F6',
      color: '#1D1D1F',
      border: 'none'
    },
    danger: {
      backgroundColor: '#FF3B30',
      color: '#FFFFFF',
      border: 'none'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#007AFF',
      border: 'none'
    }
  };

  const sizeStyles = {
    sm: {
      padding: '6px 12px',
      fontSize: '14px'
    },
    md: {
      padding: '8px 16px',
      fontSize: '16px'
    },
    lg: {
      padding: '12px 24px',
      fontSize: '18px'
    }
  };

  const baseStyle = {
    borderRadius: '12px',
    fontWeight: '500',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
    ...variantStyles[variant],
    ...sizeStyles[size]
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
      className={className}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.9';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '1';
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.8';
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.9';
        }
      }}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
