import { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface InputFieldProps extends ComponentProps<'input'> {
  variant: 'auth' | 'modal';
  active?: boolean;
  suffix?: string;
}

export function Input({ variant, active, suffix, className, ...props }: InputFieldProps) {
  return (
    <div
      className={twMerge(
        'flex flex-1 items-center rounded-md',
        variant === 'auth' ? 'border border-neutral-300 bg-white px-4 py-3' : 'bg-gray-50 p-2.5',
        variant === 'auth' && active && 'border-classpick-500 shadow-classpick-100 shadow-xs',
      )}
    >
      <input
        className={twMerge(
          'body1-pretendard w-full focus:ring-0 focus:outline-none',
          variant === 'auth' ? 'text-primary-gray-600' : 'text-classpick-500 text-center',
          className,
        )}
        {...props}
      />
      {suffix && (
        <span
          className={twMerge(
            'body1',
            variant === 'auth' ? 'text-primary-gray-600' : 'text-classpick-500 body1',
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}
