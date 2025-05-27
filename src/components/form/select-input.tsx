import { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

export function SelectInput({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <select
      className={twMerge(
        'border-classpick-400 placeholder:text-classpick-400 text-classpick-500 body2-pretendard rounded-md border bg-white p-0 px-4 py-3 text-center focus:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
