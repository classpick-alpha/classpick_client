import { Dispatch, MouseEvent, SetStateAction, TouchEvent, useCallback, useState } from 'react';

import { splitMinute } from '@/app/[id]/_config';

import ReserveModal from '@/modal/reserve.modal';

import { LectureResponse } from '@/api/dto/lecture';
import { DailyReservation, RoomResponse } from '@/api/dto/room';
import { useModalStore } from '@/store/modal.store';
import { isSameDay, parse } from 'date-fns';

interface useTimetableDragProps {
  room?: RoomResponse;
  lectures: LectureResponse[];
  reservations: DailyReservation[];
  setReservations: Dispatch<SetStateAction<DailyReservation[]>>;
}

export default function useTimetableDrag({
  room,
  lectures,
  reservations,
  setReservations,
}: useTimetableDragProps) {
  const { openModal } = useModalStore();

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Date>();
  const [dragEnd, setDragEnd] = useState<Date>();

  const isOccupied = useCallback(
    (date: Date) =>
      !!reservations
        .find((reservation) => isSameDay(parse(reservation.date, 'yyyy-MM-dd', date), date))
        ?.reservations.some(
          (reservation) =>
            parse(reservation.startTime, 'HH:mm', date).getTime() <= date.getTime() &&
            date.getTime() < parse(reservation.endTime, 'HH:mm', date).getTime(),
        ) ||
      lectures
        .filter(
          (lecture) =>
            lecture.dow ===
            ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][
              date.getDay()
            ],
        )
        .some(
          (lecture) =>
            parse(lecture.startTime, 'HH:mm', date).getTime() <= date.getTime() &&
            date.getTime() < parse(lecture.endTime, 'HH:mm', date).getTime(),
        ),
    [lectures, reservations],
  );

  const handleDragStart = useCallback((e: MouseEvent | TouchEvent, date: Date) => {
    e.preventDefault();

    if (isOccupied(date)) return;

    setIsDragging(true);
    setDragStart(date);
    setDragEnd(new Date(date.getTime() + splitMinute * 60 * 1000));
  }, []);

  const handleDragging = useCallback(
    (e: MouseEvent | TouchEvent, date: Date) => {
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
    (e: MouseEvent | TouchEvent) => {
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
          setTimeTable={setReservations}
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
