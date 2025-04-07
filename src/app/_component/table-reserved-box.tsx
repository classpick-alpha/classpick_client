import Image from 'next/image';

import { pxPerMinute } from '@/app/_config';
import { EventData } from '@/app/page';

import { formatDate } from 'date-fns';

interface TableReservedBoxProps {
  event: EventData;
  startOffset: number;
  endOffset: number;
}

export default function TableReservedBox({ event, startOffset, endOffset }: TableReservedBoxProps) {
  return (
    <div
      className="border-classpick-500 from-classpick-200 absolute left-[10px] z-20 flex h-full w-[calc(100%-20px)] flex-col justify-end rounded-md border-2 bg-linear-to-b to-white shadow"
      style={{
        top: `${startOffset * pxPerMinute}px`,
        height: `${(endOffset - startOffset) * pxPerMinute}px`,
      }}
    >
      <div className="flex gap-2 p-4">
        <Image
          src={event.user!.avatar}
          alt={event.user!.name}
          width={38}
          height={38}
          className="size-9.5 rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-sm font-bold">{event.user!.name}</p>
          <p className="text-classpick-500 text-xs font-bold">
            {formatDate(event.start, 'HH:mm')}-{formatDate(event.end, 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
}
