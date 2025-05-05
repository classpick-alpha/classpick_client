import { useCallback } from 'react';

import { pxPerMinute, startHour } from '@/app/[id]/_config';

interface TableDraggingArea {
  date: Date;
  isDragging: boolean;
  dragStart: Date | undefined;
  dragEnd: Date | undefined;
}

export default function TableDraggingArea({
  date,
  isDragging,
  dragStart,
  dragEnd,
}: TableDraggingArea) {
  const dateToSlot = useCallback(
    (date: Date) => Math.max(0, date.getHours() - startHour) * 60 + date.getMinutes(),
    [],
  );

  if (!isDragging || !dragStart || !dragEnd || dragStart.getDay() !== date.getDay()) return null;

  return (
    <div
      className="absolute left-[10px] z-20 flex h-full w-[calc(100%-20px)] items-center justify-center rounded-md"
      style={{
        top: `${dateToSlot(dragStart) * pxPerMinute}px`,
        height: `${(dateToSlot(dragEnd) - dateToSlot(dragStart)) * pxPerMinute}px`,
      }}
    >
      <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-dashed border-red-300 bg-orange-500/10 backdrop-blur-[1px]">
        <span className="font-bold text-orange-500">+</span>
      </div>
    </div>
  );
}
