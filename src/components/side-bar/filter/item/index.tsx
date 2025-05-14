import { ReactNode, useContext, useMemo } from 'react';

import { FilterItem, sideBarFilterContext } from '@/components/side-bar/filter';

import { useFilterStore } from '@/store/filter.store';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown2, ArrowUp2, Icon } from 'iconsax-react';
import { twMerge } from 'tailwind-merge';
import colors from 'tailwindcss/colors';

interface SideBarFilterItemProps<T> {
  name: FilterItem;
  title: string;
  value: T | undefined;
  labelFormatter?: (value: T) => ReactNode;
  placeholder: string;
  children: ReactNode;
}

export default function SideBarFilterItem<T>({
  name,
  title,
  value,
  labelFormatter = (value) => value?.toString(),
  placeholder,
  children,
}: SideBarFilterItemProps<T>) {
  const { open, setOpen } = useContext(sideBarFilterContext);

  const { isActive } = useFilterStore();

  const OpenIcon = useMemo<Icon>(() => (open === name ? ArrowDown2 : ArrowUp2), [open]);

  return (
    <div
      className={twMerge(
        'w-[260px] rounded-md border bg-white shadow-md',
        isActive(name) ? 'border-classpick-300' : 'border-white',
      )}
    >
      <div className="pt-3 pr-6 pb-4 pl-4">
        <div className="flex flex-col gap-3">
          <p
            className={twMerge(
              'font-bold',
              isActive(name) ? 'text-sidebar-filter-title' : 'text-neutral-500',
            )}
          >
            {title}
          </p>
          <div className="flex justify-between">
            <p
              className={twMerge(
                'text-xs font-bold',
                isActive(name) ? 'text-sidebar-filter-description' : 'text-neutral-400',
              )}
            >
              {value ? labelFormatter(value) : placeholder}
            </p>

            <OpenIcon
              size={16}
              color={
                isActive(name) ? 'var(--color-sidebar-filter-description)' : colors.neutral['400']
              }
              className="cursor-pointer"
              onClick={() => setOpen(open === name ? undefined : name)}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open === name && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <hr className={isActive(name) ? 'border-classpick-300' : 'border-neutral-400'} />
            <div className="p-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
