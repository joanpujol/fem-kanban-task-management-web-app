import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const header = tv({
  base: 'font-bold font-sans',
  variants: {
    variant: {
      xl: 'text-xl leading-xl',
      lg: 'text-lg leading-lg',
      md: 'text-md leading-md',
      sm: 'text-xs leading-sm tracking-widest text-medium-gray'
    },
  },
  defaultVariants: {
    variant: 'xl',
  },
});

type HeaderVariants = VariantProps<typeof header>;

type HeaderProps = HeaderVariants & {
  children: React.ReactNode;
};

const Header = ({ 
  variant, 
  children, 
  ...props 
}: HeaderProps): JSX.Element => {
  return (
    <h1 className={header({ variant })} {...props}>
      {children}
    </h1>
  );
};

export default Header;
