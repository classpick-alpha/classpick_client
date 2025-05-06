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
      className="border-classpick-500 from-classpick-200 absolute left-[10px] z-20 flex h-full w-[calc(100%-20px)] flex-col justify-end rounded-md border-2 bg-linear-to-b to-white shadow"
      style={{
        top: `${startOffset * pxPerMinute}px`,
        height: `${(endOffset - startOffset) * pxPerMinute}px`,
      }}
    >
      <div className="flex flex-col p-4">
        {/*TODO: 유저가 서버에서 안넘어옴*/}
        <p className="text-sm font-bold">(수정필요)</p>
        <p className="text-classpick-500 text-xs font-bold">
          {reservation.startTime}-{reservation.endTime}
        </p>
      </div>
    </div>
  );
}
