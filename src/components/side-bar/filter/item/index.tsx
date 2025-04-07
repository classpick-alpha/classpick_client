import { ReactNode, useContext, useEffect, useMemo } from 'react';

import { FilterItem, sideBarFilterContext } from '@/components/side-bar/filter';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown2, ArrowUp2, Icon } from 'iconsax-react';
import { twMerge } from 'tailwind-merge';

interface SideBarFilterItemProps<T> {
  name: FilterItem;
  title: string;
  value: T | undefined;
  labelFormatter?: (value: T) => ReactNode;
  placeholder: string;
  onActive?: () => void;
  children: ReactNode;
}

export default function SideBarFilterItem<T>({
  name,
  title,
  value,
  labelFormatter = (value) => value?.toString(),
  placeholder,
  onActive,
  children,
}: SideBarFilterItemProps<T>) {
  const { open, setOpen, active } = useContext(sideBarFilterContext);

  const OpenIcon = useMemo<Icon>(() => (open === name ? ArrowDown2 : ArrowUp2), [open]);

  useEffect(() => {
    if (!active.includes(name)) return;
    onActive?.();
  }, [active]);

  return (
    <div
      className={twMerge(
        'w-[260px] rounded-md bg-white shadow-md',
        active.includes(name) ? 'border-classpick-300 border' : '',
      )}
    >
      <div className="pt-3 pr-6 pb-4 pl-4">
        <div className="flex flex-col gap-3">
          <p
            className={twMerge(
              'font-bold',
              active.includes(name) ? 'text-sidebar-filter-title' : 'text-neutral-500',
            )}
          >
            {title}
          </p>
          <div className="flex justify-between">
            <p
              className={twMerge(
                'text-xs font-bold',
                active.includes(name) ? 'text-sidebar-filter-description' : 'text-neutral-400',
              )}
            >
              {value ? labelFormatter(value) : placeholder}
            </p>
            {active.includes(name) && (
              <OpenIcon
                size={16}
                color="var(--color-sidebar-filter-description)"
                className="cursor-pointer"
                onClick={() => setOpen(open === name ? undefined : name)}
              />
            )}
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
            <hr className={active ? 'border-classpick-300' : 'border-neutral-400'} />
            <div className="p-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
