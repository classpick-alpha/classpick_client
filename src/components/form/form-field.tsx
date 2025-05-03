import { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

interface FormFieldProps extends ComponentProps<'div'> {
  label: string;
  required?: boolean;
}

export function FormField({ label, required, className, children, ...props }: FormFieldProps) {
  return (
    <div className={twMerge('flex flex-col gap-1', className)} {...props}>
      <p className="subtitle2-pretendard flex items-start text-stone-700">
        {label}
        {required && <span className="text-system-alarm">*</span>}
      </p>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
