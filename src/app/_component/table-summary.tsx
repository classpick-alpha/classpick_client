import { useMemo } from 'react';

import { useFilterStore } from '@/store/filter.store';
import { nowExcludeTime } from '@/util';
import { formatDate } from 'date-fns';
import { twMerge } from 'tailwind-merge';

interface TableSummaryProps {
  dates: Date[];
}

export default function TableSummary({ dates }: TableSummaryProps) {
  const { startDate, room } = useFilterStore();

  const today = useMemo(nowExcludeTime, []);

  if (!room) return null;

  return (
    <div className="flex flex-col gap-3 rounded-t-2xl">
      <div className="flex flex-col gap-2 pt-8 pl-7.5">
        <div className="text-2xl leading-6 font-extrabold text-neutral-700">
          {startDate!.getMonth() + 1}월, {startDate!.getFullYear()}년
        </div>
        <div className="text-lg leading-4.5 text-neutral-700">
          {room.place_name} {room.unit_number}
        </div>
      </div>

      <div className="flex">
        <div className="min-w-28" />
        {dates.map((date) => (
          <div key={date.getTime()} className="flex w-full flex-col items-center gap-1">
            <div
              className={twMerge(
                'text-xs font-bold text-zinc-500',
                today.getTime() === date.getTime() && 'text-classpick-500',
              )}
            >
              {formatDate(date, 'E').toUpperCase()}
            </div>

            <span
              className={twMerge(
                'flex size-11 items-center justify-center text-2xl font-bold text-neutral-700',
                today.getTime() === date.getTime() && 'bg-classpick-500 rounded-full text-white',
              )}
            >
              {date.getDate()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
