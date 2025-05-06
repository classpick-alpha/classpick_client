'use client';

import { use, useCallback, useEffect, useMemo, useState } from 'react';

import TableBlock from '@/app/[id]/_component/table-block';
import TableContainer from '@/app/[id]/_component/table-container';
import TableCurrentBar from '@/app/[id]/_component/table-current-bar';
import TableDraggingArea from '@/app/[id]/_component/table-dragging-area';
import TablePendingBox from '@/app/[id]/_component/table-pending-box';
import TableReservedBox from '@/app/[id]/_component/table-reserved-box';
import TableSummary from '@/app/[id]/_component/table-summary';
import { startHour } from '@/app/[id]/_config';

import Api from '@/api';
import { Status } from '@/api/dto/reservation';
import { DailyReservation, RoomResponse } from '@/api/dto/room';
import useTimetableDrag from '@/hook/timetable/drag';
import { useApi } from '@/hook/use-api';
import { useFilterStore } from '@/store/filter.store';
import { eachDayOfInterval, endOfWeek, format, isSameDay, parse, startOfWeek } from 'date-fns';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: Props) {
  const { id: roomId } = use(params);

  const [isApiProcessing, startApi] = useApi();

  const [room, setRoom] = useState<RoomResponse>();
  const [timeTable, setTimeTable] = useState<DailyReservation[]>([]);

  const { date: _date } = useFilterStore();
  const date = useMemo(() => _date || new Date(), [_date]);

  const {
    isDragging,
    dragStart,
    dragEnd,
    handleDragStart,
    handleDragging,
    handleDragEnd,
    isOccupied,
  } = useTimetableDrag({ room, timeTable, setTimeTable });

  const dates = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(date, { weekStartsOn: 1 }),
        end: endOfWeek(date, { weekStartsOn: 1 }),
      }).slice(0, 5),
    [date],
  );

  const dateToSlot = useCallback(
    (date: Date) => Math.max(0, date.getHours() - startHour) * 60 + date.getMinutes(),
    [],
  );

  useEffect(() => {
    startApi(async () => {
      const { room, weekly } = await Api.Domain.Room.getRoomTimeTable(
        roomId,
        format(date, 'yyyy-MM-dd'),
      );
      setRoom(room);
      setTimeTable(weekly);
    });
  }, [roomId, date]);

  if (isApiProcessing || !room || !timeTable) return null;

  return (
    <div className="flex max-h-[calc(100dvh-80px-32px)] w-full flex-col rounded-2xl bg-white p-4">
      <TableSummary date={date} dates={dates} room={room} />
      <TableContainer handleDragEnd={handleDragEnd}>
        {dates.map((date) => (
          <div key={date.getTime()} className="relative">
            <TableCurrentBar date={date} />

            <TableBlock
              date={date}
              isOccupied={isOccupied}
              handleDragStart={handleDragStart}
              handleDragging={handleDragging}
              isDragging={isDragging}
            />

            <TableDraggingArea
              date={date}
              isDragging={isDragging}
              dragStart={dragStart}
              dragEnd={dragEnd}
            />

            {timeTable
              .find((reservation) =>
                isSameDay(parse(reservation.date, 'yyyy-MM-dd', new Date()), date),
              )
              ?.reservations.map((reservation) => {
                const startOffset = dateToSlot(parse(reservation.startTime, 'HH:mm', new Date()));
                const endOffset = dateToSlot(parse(reservation.endTime, 'HH:mm', new Date()));

                if (reservation.status === Status.REQUESTED) {
                  return (
                    <TablePendingBox
                      key={reservation.startTime}
                      startOffset={startOffset}
                      endOffset={endOffset}
                    />
                  );
                } else {
                  return (
                    <TableReservedBox
                      key={reservation.endTime}
                      reservation={reservation}
                      startOffset={startOffset}
                      endOffset={endOffset}
                    />
                  );
                }
              })}
          </div>
        ))}
      </TableContainer>
    </div>
  );
}
