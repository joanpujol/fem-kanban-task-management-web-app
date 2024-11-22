import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const text = tv({
  base: 'font-sans',
  variants: {
    variant: {
      regular: 'font-medium text-sm leading-lg text-contrast-pure',
      bold: 'font-bold text-xs leading-sm text-contrast-pure',
      strikethrough:
        'font-bold text-xs leading-sm line-through text-contrast-pure/50',
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
