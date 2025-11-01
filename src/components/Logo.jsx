import React from 'react';

const Logo = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* House shape */}
      <path
        d="M50 10 L85 40 L85 85 L15 85 L15 40 Z"
        fill="#007AFF"
        stroke="#005BBB"
        strokeWidth="2"
      />

      {/* Roof */}
      <path
        d="M50 10 L85 40 L80 40 L50 15 L20 40 L15 40 Z"
        fill="#005BBB"
      />

      {/* Door */}
      <rect
        x="40"
        y="60"
        width="20"
        height="25"
        rx="2"
        fill="white"
        opacity="0.9"
      />

      {/* Checkmark in circle - represents completion/planning */}
      <circle
        cx="70"
        cy="60"
        r="12"
        fill="#34C759"
        stroke="white"
        strokeWidth="2"
      />

      {/* Checkmark */}
      <path
        d="M65 60 L68 63 L75 56"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Window */}
      <rect
        x="25"
        y="50"
        width="10"
        height="10"
        rx="1"
        fill="white"
        opacity="0.8"
      />
    </svg>
  );
};

export default Logo;
