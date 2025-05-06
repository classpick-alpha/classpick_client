import { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface FormFieldProps extends ComponentProps<'div'> {
  label: string;
  required?: boolean;
  error?: string;
}

export function FormField({
  label,
  required,
  error,
  className,
  children,
  ...props
}: FormFieldProps) {
  return (
    <div className={twMerge('flex w-full flex-col gap-1', className)} {...props}>
      <p className="subtitle2-pretendard flex items-start text-stone-700">
        {label}
        {required && <span className="text-system-alarm">*</span>}
      </p>
      <div className="flex items-center gap-2">{children}</div>
      {error && <p className="caption1-pretendard text-system-alarm">{error}</p>}
    </div>
  );
}
