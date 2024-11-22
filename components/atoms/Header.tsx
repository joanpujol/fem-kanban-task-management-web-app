import { cn } from '@/lib/utils';
import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const header = tv({
  base: 'font-bold font-sans',
  variants: {
    variant: {
      xl: 'text-xl leading-xl text-contrast-pure',
      lg: 'text-lg leading-lg text-contrast-pure',
      md: 'text-md leading-md text-contrast-pure',
      sm: 'text-xs leading-sm tracking-widest text-medium-gray',
    },
  },
  defaultVariants: {
    variant: 'xl',
  },
});

type HeaderVariants = VariantProps<typeof header>;

type HeaderProps = HeaderVariants & {
  children: React.ReactNode;
  className?: string;
};

const Header = ({
  variant,
  children,
  className,
  ...props
}: HeaderProps): JSX.Element => {
  return (
    <h1 className={cn(header({ variant }), className)} {...props}>
      {children}
    </h1>
  );
};

export default Header;
