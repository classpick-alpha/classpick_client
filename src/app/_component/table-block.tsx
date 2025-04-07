import { MouseEvent, useCallback } from 'react';

import { pxPerMinute, splitMinute, startHour } from '@/app/_config';

import useTimetableCell from '@/hook/timetable/cell';
import { twMerge } from 'tailwind-merge';

interface TableBlockProps {
  date: Date;
  isOccupied: (date: Date) => boolean;
  handleDragStart: (e: MouseEvent, date: Date) => void;
  handleDragging: (e: MouseEvent, date: Date) => void;
  isDragging: boolean;
}

export default function TableBlock({
  date,
  isOccupied,
  handleDragStart,
  handleDragging,
  isDragging,
}: TableBlockProps) {
  const timeSlots = useTimetableCell();

  const slotToDate = useCallback(
    (slot: number) => new Date(new Date(date).setHours(startHour, 0, 0, 0) + slot * 60 * 1000),
    [date],
  );

  return (
    <>
      {timeSlots.map((slot) => {
        const slotDate = slotToDate(slot);
        const occupied = isOccupied(slotDate);

        return (
          <div
            key={slot}
            className={twMerge(
              'w-full border-t border-neutral-200',
              timeSlots.at(-1) === slot && 'border-b',
              date.getDay() % 2 === 0 && 'bg-slate-50',
            )}
            style={{ top: `${slot * pxPerMinute}px`, height: `${splitMinute * pxPerMinute}px` }}
          >
            <div
              className="group absolute right-0 left-[10px] w-[calc(100%-20px)] cursor-pointer"
              style={{ top: `${slot * pxPerMinute}px`, height: `${splitMinute * pxPerMinute}px` }}
              onMouseDown={(e) => !occupied && handleDragStart(e, slotDate)}
              onMouseEnter={(e) => !occupied && handleDragging(e, slotDate)}
            >
              {!occupied && !isDragging && (
                <div className="absolute inset-0 hidden items-center justify-center rounded-md border-2 border-dashed border-red-300 bg-orange-500/10 backdrop-blur-[1px] group-hover:flex">
                  <span className="font-bold text-orange-500">+</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
