import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'font-sans font-bold text-white transition-colors duration-200 ease-in-out w-[255px]',
  variants: {
    color: {
      primary: 'bg-main hover:bg-hover-primary',
      secondary:
        'bg-secondary-button-color text-main hover:bg-secondary-button-hover',
      destructive: 'bg-red hover:bg-red-hover',
    },
    size: {
      small: 'h-[40px] text-sm leading-lg rounded-md',
      large: 'h-[48px] text-md leading-md rounded-lg',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'small',
  },
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    children: React.ReactNode;
  };

const Button = ({
  color,
  size,
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button className={button({ color, size, className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
