import { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface InputFieldProps extends ComponentProps<'input'> {
  suffix?: string;
}

export function Input({ suffix, className, ...props }: InputFieldProps) {
  return (
    <div className="flex flex-1 items-center rounded-md bg-gray-50 p-2.5">
      <input
        className={twMerge(
          'text-classpick-500 body1-pretendard w-full text-center focus:ring-0 focus:outline-none',
          className,
        )}
        {...props}
      />
      {suffix && <span className="text-classpick-500 body1">{suffix}</span>}
    </div>
  );
}
