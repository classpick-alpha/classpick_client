import { Dispatch, MouseEvent, SetStateAction, useCallback, useState } from 'react';

import { splitMinute } from '@/app/_config';
import { EventData } from '@/app/page';

interface useTimetableDragProps {
  events: EventData[];
  setEvents: Dispatch<SetStateAction<EventData[]>>;
}
export default function useTimetableDrag({ events, setEvents }: useTimetableDragProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Date>();
  const [dragEnd, setDragEnd] = useState<Date>();

  const isOccupied = useCallback(
    (date: Date) =>
      events.some(
        (event) => event.start.getTime() <= date.getTime() && date.getTime() < event.end.getTime(),
      ),
    [events],
  );

  const handleDragStart = useCallback((e: MouseEvent, date: Date) => {
    e.preventDefault();

    if (isOccupied(date)) return;

    setIsDragging(true);
    setDragStart(date);
    setDragEnd(new Date(date.getTime() + splitMinute * 60 * 1000));
  }, []);

  const handleDragging = useCallback(
    (e: MouseEvent, date: Date) => {
      e.preventDefault();

      if (!isDragging || !dragStart) return;

      if (dragStart.getDay() !== date.getDay()) return;
      if (dragStart.getTime() > date.getTime()) return;

      const adjustedDate = new Date(date.getTime() + splitMinute * 60 * 1000);

      for (
        let t = dragStart;
        t.getTime() < adjustedDate.getTime();
        t = new Date(t.getTime() + splitMinute * 60 * 1000)
      ) {
        if (isOccupied(t)) return;
      }

      if (Math.abs(adjustedDate.getTime() - dragStart.getTime()) > 120 * 60 * 1000) return;

      setDragEnd(adjustedDate);
    },
    [isDragging, dragStart],
  );

  const handleDragEnd = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      if (!isDragging || !dragStart || !dragEnd) return;

      for (
        let t = dragStart;
        t.getTime() < dragEnd.getTime();
        t = new Date(t.getTime() + splitMinute * 60 * 1000)
      ) {
        if (isOccupied(t)) {
          setIsDragging(false);
          setDragStart(undefined);
          setDragEnd(undefined);
          return;
        }
      }

      setEvents((prev) => [
        ...prev,
        {
          start: dragStart,
          end: dragEnd,
          status: 'pending',
        },
      ]);

      setIsDragging(false);
      setDragStart(undefined);
      setDragEnd(undefined);
    },
    [isDragging, dragStart, dragEnd],
  );

  return {
    isDragging,
    dragStart,
    dragEnd,
    handleDragStart,
    handleDragging,
    handleDragEnd,
    isOccupied,
  };
}
