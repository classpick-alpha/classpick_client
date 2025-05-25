import { ReactNode } from 'react';

import { Icon } from 'iconsax-react';
import { twMerge } from 'tailwind-merge';
import colors from 'tailwindcss/colors';

interface GridIconModalProps {
  width?: number;
  color?: string;
  icon: Icon;
  iconColor?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  buttons?: ReactNode;
}

export default function GridIconModal({
  width = 450,
  color = '#595cff',
  icon: Icon,
  iconColor = colors.slate['600'],
  title,
  description,
  children,
  buttons,
}: GridIconModalProps) {
  return (
    <div className="relative h-full bg-gray-50" style={{ maxWidth: width }}>
      <div className="absolute inset-0 z-0">
        <div
          className="pointer-events-none absolute top-[-20%] left-1/2 h-[100%] w-[200%] -translate-x-1/2 opacity-50"
          style={{
            background: `radial-gradient(ellipse at top center, ${color} 20%, transparent 70%)`,
          }}
        />

        <div className="absolute inset-0 grid grid-cols-15">
          {Array.from({ length: 15 * 100 }).map((_, idx) => (
            <div
              key={idx}
              className={twMerge('aspect-square border-white/20', idx % 15 !== 0 && 'border-l')}
            />
          ))}
        </div>

        <div className="absolute inset-0 grid grid-cols-15">
          {Array.from({ length: 15 * 100 }).map((_, idx) => (
            <div
              key={idx}
              className={twMerge('aspect-square border-white/20', idx >= 15 && 'border-t')}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-4 pt-9 pb-4">
        <div className="w-fit rounded-full border border-neutral-200 bg-gradient-to-b from-neutral-100 to-transparent p-6 backdrop-blur-md">
          <div className="rounded-full border border-gray-200 bg-white p-4">
            <Icon size={32} color={iconColor} variant="Bold" />
          </div>
        </div>

        <section className="flex flex-col items-center">
          <h2 className="subtitle1-nanum text-primary-gray-800">{title}</h2>
          {description && <h3 className="caption1-nanum text-primary-gray-500">{description}</h3>}
        </section>

        {children && (
          <section className="scrollbar-none max-h-[calc(100dvh-360px)] w-[calc(100%-28px)] overflow-y-auto rounded-2xl bg-white p-6 shadow-xs md:w-[calc(100%-56px)]">
            {children}
          </section>
        )}

        {buttons && <section className="flex w-full justify-center gap-2 px-7">{buttons}</section>}
      </div>
    </div>
  );
}
