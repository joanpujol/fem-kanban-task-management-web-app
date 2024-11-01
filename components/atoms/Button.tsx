import React from 'react';

type ButtonVariant = 'primaryLarge' | 'primarySmall' | 'secondary' | 'destructive';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primaryLarge', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'font-sans font-bold';

  const variantClasses: Record<ButtonVariant, string> = {
    primaryLarge: 'bg-purple text-white text-md leading-md hover:bg-purple-hover font-bold w-[255px] h-[48px] rounded-lg',
    primarySmall: 'bg-purple text-white text-sm leading-lg hover:bg-purple-hover w-[255px] h-[40px] rounded-md',
    secondary: 'bg-purple/10 text-purple text-sm leading-lg hover:bg-purple/25 w-[255px] h-[40px] rounded-md',
    destructive: 'bg-red text-white text-sm leading-md hover:bg-red-hover w-[255px] h-[40px] rounded-md',
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
