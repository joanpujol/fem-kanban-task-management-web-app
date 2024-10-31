import React from 'react';

type HeaderSize = 'xl' | 'lg' | 'md' | 'sm';

interface HeaderProps {
  variant?: HeaderSize;
  children: React.ReactNode;
}

const Header = ({ variant = 'xl', children }: HeaderProps) => {
  const baseClasses = 'font-bold font-sans';
  
  const variantClasses = {
    xl: 'text-xl leading-xl',
    lg: 'text-lg leading-lg',
    md: 'text-md leading-md',
    sm: 'text-xs leading-sm tracking-widest text-medium-gray'
  };

  return (
    <h1 className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </h1>
  );
};

export default Header;
