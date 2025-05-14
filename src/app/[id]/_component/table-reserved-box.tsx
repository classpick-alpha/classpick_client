import { pxPerMinute } from '@/app/[id]/_config';

import { TimeReservations } from '@/api/dto/room';

interface TableReservedBoxProps {
  reservation: TimeReservations;
  startOffset: number;
  endOffset: number;
}

export default function TableReservedBox({
  reservation,
  startOffset,
  endOffset,
}: TableReservedBoxProps) {
  return (
    <div
      className="border-classpick-200 from-classpick-200 absolute left-[10px] z-20 flex h-full w-[calc(100%-20px)] flex-col justify-end rounded-md border-2 bg-linear-to-b to-white shadow"
      style={{
        top: `${(startOffset + 2) * pxPerMinute}px`,
        height: `${(endOffset - startOffset - 4) * pxPerMinute}px`,
      }}
    >
      <div className="flex flex-col p-4">
        <p className="font-nanum text-sm font-bold">{reservation.user.name}</p>
        <p className="text-classpick-500 text-xs font-medium">
          {reservation.startTime}-{reservation.endTime}
        </p>
      </div>
    </div>
  );
}
