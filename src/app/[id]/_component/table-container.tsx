import { MouseEvent, ReactNode } from 'react';

import { endHour, pxPerMinute, startHour, totalHeight } from '@/app/[id]/_config';

interface TableContainerProps {
  handleDragEnd: (e: MouseEvent) => void;
  children: ReactNode;
}

export default function TableContainer({ handleDragEnd, children }: TableContainerProps) {
  return (
    <div className="relative mt-4 flex overflow-y-auto" onMouseUp={handleDragEnd}>
      {/*왼쪽 시간 라벨*/}
      <div className="relative w-16">
        {Array.from({ length: endHour - startHour + 1 }, (_, i) => (
          <div
            key={i}
            className="absolute flex w-full justify-center pr-4"
            style={{ top: `${i * 60 * pxPerMinute}px` }}
          >
            <span className="text-sm font-extrabold text-neutral-600">{i + startHour}:00</span>
          </div>
        ))}
      </div>

      <div className="relative flex-1">
        <div
          className="relative z-10 grid min-[0px]:grid-cols-1 min-[420px]:grid-cols-2 min-[570px]:grid-cols-3 min-[768px]:grid-cols-2 min-[918px]:grid-cols-3 min-[1068px]:grid-cols-4 min-[1218px]:grid-cols-4"
          style={{ height: `${totalHeight}px` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
