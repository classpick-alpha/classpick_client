import { useMemo } from 'react';

import { RedirectType, redirect } from 'next/navigation';

import { nowExcludeTime } from '@/util';
import { formatDate } from 'date-fns';
import { MoveLeft } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface TableSummaryProps {
  date: Date;
  dates: Date[];
  roomName: string;
}

export default function TableSummary({ date, dates, roomName }: TableSummaryProps) {
  const today = useMemo(nowExcludeTime, []);

  return (
    <div className="flex flex-col gap-3 rounded-t-2xl">
      <div className="flex items-center gap-4 pt-8 pl-7.5">
        <div
          className="border-classpick-500 h-fit cursor-pointer rounded-full border p-2"
          onClick={() => redirect('/', RedirectType.push)}
        >
          <MoveLeft size={18} color="var(--color-classpick-500)" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-2xl leading-6 font-extrabold text-neutral-700">
            {date.getMonth() + 1}월, {date.getFullYear()}년
          </div>
          <div className="text-lg leading-4.5 text-neutral-700">{roomName}</div>
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
