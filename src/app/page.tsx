'use client';

import { useCallback, useMemo, useState } from 'react';

import TableBlock from '@/app/_component/table-block';
import TableContainer from '@/app/_component/table-container';
import TableCurrentBar from '@/app/_component/table-current-bar';
import TableDraggingArea from '@/app/_component/table-dragging-area';
import TablePendingBox from '@/app/_component/table-pending-box';
import TableReservedBox from '@/app/_component/table-reserved-box';
import TableSummary from '@/app/_component/table-summary';
import { startHour } from '@/app/_config';

import useTimetableDrag from '@/hook/timetable/drag';
import { useFilterStore } from '@/store/filter.store';

export interface EventData {
  start: Date;
  end: Date;
  status: 'pending' | 'reserved';
  user?: {
    name: string;
  };
}

const MOCK_EVENT_DATA: EventData[] = [
  {
    start: new Date(2025, 3, 7, 10, 20, 0, 0),
    end: new Date(2025, 3, 7, 12, 0, 0, 0),
    status: 'reserved',
    user: {
      name: '손대현',
    },
  },
  {
    start: new Date(2025, 3, 8, 13, 0, 0, 0),
    end: new Date(2025, 3, 8, 15, 0, 0, 0),
    status: 'pending',
  },
];

export default function TimeTablePage() {
  const [events, setEvents] = useState<EventData[]>(MOCK_EVENT_DATA);

  const { building, room, startDate, endDate } = useFilterStore();

  const {
    isDragging,
    dragStart,
    dragEnd,
    handleDragStart,
    handleDragging,
    handleDragEnd,
    isOccupied,
  } = useTimetableDrag({ events, setEvents });

  const dates = useMemo(() => {
    if (!startDate || !endDate) return [];

    let current = new Date(startDate);
    const arr = [current];

    while (current < endDate) {
      current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
      arr.push(current);
    }

    return arr;
  }, [startDate, endDate]);

  const dateToSlot = useCallback(
    (date: Date) => Math.max(0, date.getHours() - startHour) * 60 + date.getMinutes(),
    [],
  );

  return (
    <div className="flex max-h-[calc(100dvh-80px-32px)] w-full flex-col rounded-2xl bg-white p-4">
      {!building || !room || !startDate || !endDate ? (
        <p>여기에 뭘 넣을까요?</p>
      ) : (
        <>
          <TableSummary dates={dates} />
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

                {events
                  .filter((event) => event.start.getDay() === date.getDay())
                  .map((event) => {
                    const startOffset = dateToSlot(event.start);
                    const endOffset = dateToSlot(event.end);

                    if (event.status === 'pending') {
                      return (
                        <TablePendingBox
                          key={event.start.getTime()}
                          startOffset={startOffset}
                          endOffset={endOffset}
                        />
                      );
                    } else {
                      return (
                        <TableReservedBox
                          key={event.start.getTime()}
                          event={event}
                          startOffset={startOffset}
                          endOffset={endOffset}
                        />
                      );
                    }
                  })}
              </div>
            ))}
          </TableContainer>
        </>
      )}
    </div>
  );
}
