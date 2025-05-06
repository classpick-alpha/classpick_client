import { pxPerMinute } from '@/app/[id]/_config';

interface TablePendingBoxProps {
  startOffset: number;
  endOffset: number;
}

export default function TablePendingBox({ startOffset, endOffset }: TablePendingBoxProps) {
  return (
    <div
      className="border-classpick-400 bg-classpick-400/10 absolute left-[10px] z-20 flex h-full w-[calc(100%-20px)] items-center justify-center rounded-md border-2 backdrop-blur-[2px]"
      style={{
        top: `${startOffset * pxPerMinute}px`,
        height: `${(endOffset - startOffset) * pxPerMinute}px`,
      }}
    >
      <span className="text-classpick-500 font-bold">관리자 승인중</span>
    </div>
  );
}
