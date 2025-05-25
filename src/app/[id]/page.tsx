'use client';

import { use, useCallback, useEffect, useMemo, useState } from 'react';

import TableBlock from '@/app/[id]/_component/table-block';
import TableContainer from '@/app/[id]/_component/table-container';
import TableCurrentBar from '@/app/[id]/_component/table-current-bar';
import TableDraggingArea from '@/app/[id]/_component/table-dragging-area';
import TableLectureBox from '@/app/[id]/_component/table-lecture-box';
import TablePendingBox from '@/app/[id]/_component/table-pending-box';
import TableReservedBox from '@/app/[id]/_component/table-reserved-box';
import TableSummary from '@/app/[id]/_component/table-summary';
import { startHour } from '@/app/[id]/_config';

import Api from '@/api';
import { LectureResponse } from '@/api/dto/lecture';
import { Status } from '@/api/dto/reservation';
import { DailyReservation, RoomResponse } from '@/api/dto/room';
import useTimetableDrag from '@/hook/timetable/drag';
import { useApi } from '@/hook/use-api';
import { useFilterStore } from '@/store/filter.store';
import { getGridCols } from '@/util';
import { eachDayOfInterval, endOfWeek, format, isSameDay, parse, startOfWeek } from 'date-fns';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: Props) {
  const { id: roomId } = use(params);

  const [isApiProcessing, startApi] = useApi();

  const [room, setRoom] = useState<RoomResponse>();
  const [reservations, setReservations] = useState<DailyReservation[]>([]);
  const [lectures, setLectures] = useState<LectureResponse[]>([]);

  const { date: _date } = useFilterStore();
  const date = useMemo(() => _date || new Date(), [_date]);

  const [cols, setCols] = useState(() =>
    getGridCols(typeof window !== 'undefined' ? window.innerWidth : 1200),
  );

  const {
    isDragging,
    dragStart,
    dragEnd,
    handleDragStart,
    handleDragging,
    handleDragEnd,
    isOccupied,
  } = useTimetableDrag({ room, lectures, reservations, setReservations });

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
      setReservations(weekly);
    });
  }, [roomId, date]);

  useEffect(() => {
    startApi(async () => {
      const { lectures } = await Api.Domain.Lecture.getLectures(roomId);
      setLectures(lectures);
    });
  }, [roomId]);

  useEffect(() => {
    const onResize = () => setCols(getGridCols(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isApiProcessing || !room || !reservations) return null;

  return (
    <div className="flex max-h-[calc(100dvh-80px-32px)] min-h-[calc(100dvh-64px)] w-full flex-col bg-white p-4 md:rounded-2xl">
      <TableSummary date={date} dates={dates} room={room} />
      <TableContainer handleDragEnd={handleDragEnd}>
        {dates.slice(0, cols).map((date) => (
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

            {lectures
              .filter(
                (lecture) =>
                  lecture.dow ===
                  ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][
                    date.getDay()
                  ],
              )
              .map((lecture) => (
                <TableLectureBox
                  key={lecture.name + lecture.startTime}
                  lecture={lecture}
                  startOffset={dateToSlot(parse(lecture.startTime, 'HH:mm', new Date()))}
                  endOffset={dateToSlot(parse(lecture.endTime, 'HH:mm', new Date()))}
                />
              ))}

            {reservations
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
