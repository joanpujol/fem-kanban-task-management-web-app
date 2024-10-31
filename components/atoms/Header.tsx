import React from 'react';

type HeaderSize = 'XL' | 'LG' | 'MD' | 'SM';

interface HeaderProps {
  size?: HeaderSize;
  children: React.ReactNode;
}

const Header = ({ size = 'XL', children }: HeaderProps) => {
  const baseClasses = 'font-bold';
  
  const sizeClasses = {
    XL: 'text-xl leading-xl',
    LG: 'text-lg leading-lg',
    MD: 'text-md leading-md',
    SM: 'text-sm leading-sm tracking-widest text-medium-gray'
  };

  return (
    <h1 className={`${baseClasses} ${sizeClasses[size]}`}>
      {children}
    </h1>
  );
};

export default Header;
