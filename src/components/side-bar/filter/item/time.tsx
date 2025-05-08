import { useCallback, useState } from 'react';

import SideBarFilterItem from '@/components/side-bar/filter/item/index';

import { useFilterStore } from '@/store/filter.store';
import { addMinutes, format, isAfter, isBefore, isEqual, parse, subMinutes } from 'date-fns';
import { ko } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export default function SideBarFilterTimeItem() {
  const { startTime, endTime, setStartTime, setEndTime } = useFilterStore();

  const [isFirstClick, setFirstClick] = useState(true);

  const getDate = useCallback(
    (hour: number, minute: number) => parse(`${hour}:${minute}`, 'H:m', new Date()),
    [],
  );

  const isInRange = useCallback(
    (date: Date) => {
      if (!(startTime && endTime)) return false;

      return (isAfter(date, startTime) || isEqual(date, startTime)) && isBefore(date, endTime);
    },
    [startTime, endTime],
  );

  const handleTimeClick = useCallback(
    (hour: number, minute: number) => {
      let date = getDate(hour, minute);
      if (!isFirstClick) date = addMinutes(date, 30);

      if (startTime && endTime) {
        setStartTime(date);
        setEndTime(undefined);
        setFirstClick(false);
      } else if (startTime && !endTime) {
        if (date <= startTime) {
          setEndTime(addMinutes(startTime, 30));
          setStartTime(subMinutes(date, 30));
        } else {
          setEndTime(date);
        }
        setFirstClick(true);
      } else {
        setStartTime(date);
        setFirstClick(false);
      }
    },
    [startTime, endTime],
  );

  return (
    <SideBarFilterItem
      name="time"
      title="예약시간"
      value={startTime && endTime ? [startTime, endTime] : undefined}
      labelFormatter={([startTime, endTime]) =>
        startTime && endTime
          ? `${format(startTime!, 'a h:mm', { locale: ko })} ~ ${format(endTime!, 'a h:mm', { locale: ko })}`
          : ''
      }
      placeholder="강의실 예약할 시간을 선택해주세요"
    >
      <div className="grid grid-cols-4 gap-x-1.5 gap-y-4 p-4">
        {Array.from({ length: 14 }, (_, idx) => idx + 9).map((hour) => (
          <div key={hour} className="flex flex-col justify-end gap-0.5">
            {(hour === 9 || hour === 12) && (
              <p className="caption2-pretendard text-neutral-400">{hour === 9 ? '오전' : '오후'}</p>
            )}
            <p className="body2-pretendard">{hour}시</p>
            <div className="flex">
              <div
                onClick={() => handleTimeClick(hour, 0)}
                className={twMerge(
                  'h-7 w-1/2 cursor-pointer rounded-l border-y border-l',
                  isInRange(getDate(hour, 0))
                    ? 'bg-classpick-400 border-classpick-400'
                    : 'bg-classpick-100 border-classpick-300',
                  startTime && isEqual(startTime, getDate(hour, 0)) && 'bg-classpick-400',
                )}
              />
              <div className="border-classpick-400 h-7 w-[1px] border-y bg-white" />
              <div
                onClick={() => handleTimeClick(hour, 30)}
                className={twMerge(
                  'h-7 w-1/2 cursor-pointer rounded-r border-y border-r',
                  isInRange(getDate(hour, 30))
                    ? 'bg-classpick-400 border-classpick-400'
                    : 'bg-classpick-100 border-classpick-300',
                  startTime && isEqual(startTime, getDate(hour, 30)) && 'bg-classpick-400',
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </SideBarFilterItem>
  );
}
