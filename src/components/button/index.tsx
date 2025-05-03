import { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'white';
}

export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'flex w-full cursor-pointer items-center justify-center gap-1 rounded-xl px-6 py-4 text-sm font-semibold',
        variant === 'primary'
          ? 'bg-classpick-500 hover:bg-classpick-450 text-white'
          : variant === 'secondary'
            ? 'bg-primary-gray-600 hover:bg-primary-gray-500 text-white'
            : 'hover:bg-classpick-100 text-classpick-500 bg-white shadow-xs',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
