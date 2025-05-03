import { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

export function TextAreaInput({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type="text"
      className={twMerge(
        'border-classpick-400 placeholder:text-classpick-400 text-classpick-500 body2-pretendard w-full rounded-md border px-4 py-3 text-center focus:outline-none',
        className,
      )}
      {...props}
    />
  );
}
