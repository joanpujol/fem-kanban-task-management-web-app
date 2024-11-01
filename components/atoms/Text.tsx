import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const text = tv({
  base: 'font-sans',
  variants: {
    variant: {
      regular: 'font-medium text-sm leading-lg',
      bold: 'font-bold text-xs leading-sm'
    },
  },
  defaultVariants: {
    variant: 'regular',
  },
});

type TextVariants = VariantProps<typeof text>;

type TextProps = TextVariants & {
  children: React.ReactNode;
  className?: string;
};

const Text = ({ 
  variant, 
  children, 
  className,
  ...props 
}: TextProps): JSX.Element => {
  return (
    <p className={text({ variant, className })} {...props}>
      {children}
    </p>
  );
};

export default Text;
