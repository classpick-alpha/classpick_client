import { Dispatch, MouseEvent, SetStateAction, useCallback, useState } from 'react';

import { splitMinute } from '@/app/[id]/_config';

import ReserveModal from '@/components/modal/reserve.modal';

import { DailyReservation, RoomResponse } from '@/api/dto/room';
import { useModalStore } from '@/store/modal.store';
import { isSameDay, parse } from 'date-fns';

interface useTimetableDragProps {
  room?: RoomResponse;
  timeTable: DailyReservation[];
  setTimeTable: Dispatch<SetStateAction<DailyReservation[]>>;
}
export default function useTimetableDrag({ room, timeTable, setTimeTable }: useTimetableDragProps) {
  const { openModal } = useModalStore();

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Date>();
  const [dragEnd, setDragEnd] = useState<Date>();

  const isOccupied = useCallback(
    (date: Date) =>
      !!timeTable
        .find((reservation) => isSameDay(parse(reservation.date, 'yyyy-MM-dd', new Date()), date))
        ?.reservations.some(
          (reservation) =>
            parse(reservation.startTime, 'HH:mm', new Date()).getTime() <= date.getTime() &&
            date.getTime() < parse(reservation.endTime, 'HH:mm', new Date()).getTime(),
        ),
    [timeTable],
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

      openModal(
        <ReserveModal
          room={room!}
          date={dragStart}
          startTime={dragStart}
          endTime={dragEnd}
          setTimeTable={setTimeTable}
        />,
      );

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
