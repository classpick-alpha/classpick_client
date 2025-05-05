import { useCallback, useEffect, useMemo, useState } from 'react';

import SideBarFilterItem from '@/components/side-bar/filter/item/index';

import { useFilterStore } from '@/store/filter.store';
import { nowExcludeTime } from '@/util';
import { format } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'iconsax-react';
import { twMerge } from 'tailwind-merge';
import colors from 'tailwindcss/colors';

export default function SideBarFilterDateItem() {
  const { startDate, endDate, setStartDate, setEndDate, isActive } = useFilterStore();

  const today = useMemo(nowExcludeTime, []);

  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);

  const neareastWeek = useCallback((date: Date): [Date, Date] => {
    let startDate = new Date(date);

    if (startDate.getDay() === 6) {
      startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1);
    } else if (startDate.getDay() === 0) {
      startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
    }

    while (startDate.getDay() !== 1) {
      startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1);
    }

    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 4,
    );

    return [startDate, endDate];
  }, []);

  const getCalendarDays = useCallback((year: number, month: number) => {
    const firstDate = new Date(year, month - 1, 1);
    const lastDate = new Date(year, month, 0);

    const startDay = firstDate.getDay();
    const endDate = lastDate.getDate();

    const days: (number | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= endDate; d++) {
      days.push(d);
    }

    return days;
  }, []);

  useEffect(() => {
    if (month < 1) {
      setYear((prev) => prev - 1);
      setMonth(12);
    } else if (month > 12) {
      setYear((prev) => prev + 1);
      setMonth(1);
    }
  }, [month]);

  return (
    <SideBarFilterItem
      name="date"
      title="예약일자"
      value={startDate && endDate ? [startDate, endDate] : undefined}
      labelFormatter={([startDate, endDate]) =>
        startDate && endDate
          ? `${format(startDate!, 'M월 d일')} ~ ${format(endDate!, 'M월 d일')}`
          : ''
      }
      placeholder="강의실 예약할 일자를 선택해주세요"
    >
      <div className="flex flex-col gap-2">
        <section className="flex items-center justify-center gap-3">
          <button className="cursor-pointer p-1.5" onClick={() => setMonth((prev) => prev - 1)}>
            <ArrowLeft
              size={20}
              color={isActive('date') ? 'var(--color-classpick-500)' : colors.neutral['700']}
            />
          </button>
          <p className="text-sm font-bold text-neutral-700">
            {year}년 {month}월
          </p>
          <button className="cursor-pointer p-1.5" onClick={() => setMonth((prev) => prev + 1)}>
            <ArrowRight
              size={20}
              color={isActive('date') ? 'var(--color-classpick-500)' : colors.neutral['700']}
            />
          </button>
        </section>

        <section className="flex flex-col gap-2">
          <div className="grid grid-cols-7 text-center text-xs font-bold text-zinc-600">
            <p>일</p>
            <p>월</p>
            <p>화</p>
            <p>수</p>
            <p>목</p>
            <p>금</p>
            <p>토</p>
          </div>

          <div className="grid grid-cols-7 text-center text-xs font-bold text-zinc-600">
            {getCalendarDays(year, month).map((day, idx) => (
              <div
                key={idx}
                className={twMerge(
                  'flex size-9 items-center justify-center',

                  day
                    ? 'hover:bg-classpick-50 cursor-pointer hover:rounded-full'
                    : 'text-transparent',

                  startDate &&
                    endDate &&
                    day &&
                    twMerge(
                      startDate.getFullYear() === year &&
                        startDate.getMonth() + 1 === month &&
                        startDate.getDate() <= day &&
                        (endDate.getFullYear() === year && endDate.getMonth() + 1 === month
                          ? day <= endDate.getDate()
                          : true) &&
                        'bg-classpick-500 hover:bg-classpick-500 text-white hover:rounded-none',

                      endDate.getFullYear() === year &&
                        endDate.getMonth() + 1 === month &&
                        day <= endDate.getDate() &&
                        (startDate.getFullYear() === year && startDate.getMonth() + 1 === month
                          ? startDate.getDate() <= day
                          : true) &&
                        'bg-classpick-500 hover:bg-classpick-500 text-white hover:rounded-none',

                      year === startDate.getFullYear() &&
                        month === startDate.getMonth() + 1 &&
                        day === startDate.getDate() &&
                        'rounded-l-full hover:rounded-l-full',

                      year === endDate.getFullYear() &&
                        month === endDate.getMonth() + 1 &&
                        day === endDate.getDate() &&
                        'rounded-r-full hover:rounded-r-full',
                    ),
                )}
                onClick={() => {
                  if (!day) return;

                  const [startDate, endDate] = neareastWeek(new Date(year, month - 1, day));

                  setStartDate(startDate);
                  setEndDate(endDate);
                }}
              >
                {day ?? ''}
              </div>
            ))}
          </div>
        </section>
      </div>
    </SideBarFilterItem>
  );
}
