import React from 'react';

type TextVariant = 'lg' | 'md';

interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
}

const Text = ({ variant = 'lg', children, className = '' }: TextProps) => {
  const baseClasses = 'font-sans';
  
  const variantClasses: Record<TextVariant, string> = {
    lg: 'font-medium text-sm leading-lg',
    md: 'font-bold text-xs leading-sm'
  };

  return (
    <p className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </p>
  );
};

export default Text;
