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
          ? 'bg-classpick-600 hover:bg-classpick-500 disabled:bg-classpick-400 text-white disabled:cursor-default'
          : variant === 'secondary'
            ? 'bg-primary-gray-800 hover:bg-primary-gray-600 disabled:bg-primary-gray-500 text-white disabled:cursor-default'
            : 'hover:bg-primary-gray-200 text-primary-gray-800 disabled:bg-primary-gray-200 bg-white shadow-xs disabled:cursor-default',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
