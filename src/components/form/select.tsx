import { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface SelectProps extends ComponentProps<'select'> {
  placeholder?: string;
  active?: boolean;
}

export function Select({ placeholder, active, className, children, ...props }: SelectProps) {
  return (
    <div
      className={twMerge(
        'flex flex-1 items-center rounded-md border border-neutral-300 bg-white',
        active && 'border-classpick-500 shadow-classpick-100 shadow-xs',
      )}
    >
      <select
        className={twMerge(
          'body1-pretendard text-primary-gray-600 mr-4 w-full cursor-pointer bg-transparent py-3 pl-4 focus:ring-0 focus:outline-none',
          className,
        )}
        {...props}
      >
        <option value="" hidden>
          {placeholder}
        </option>
        {children}
      </select>
    </div>
  );
}
