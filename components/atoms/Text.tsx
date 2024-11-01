import React from 'react';

type TextVariant = 'regular' | 'bold';

interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
}

const Text = ({ variant = 'regular', children, className = '' }: TextProps) => {
  const baseClasses = 'font-sans';
  
  const variantClasses: Record<TextVariant, string> = {
    regular: 'font-medium text-sm leading-lg',
    bold: 'font-bold text-xs leading-sm'
  };

  return (
    <p className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </p>
  );
};

export default Text;
