import { pxPerMinute } from '@/app/[id]/_config';

import { LectureResponse } from '@/api/dto/lecture';

interface TableLectureBoxProps {
  lecture: LectureResponse;
  startOffset: number;
  endOffset: number;
}

export default function TableLectureBox({ lecture, startOffset, endOffset }: TableLectureBoxProps) {
  return (
    <div
      className="absolute left-[10px] z-20 flex h-full w-[calc(100%-20px)] flex-col justify-end rounded-md border-2 border-neutral-200 bg-neutral-100/80"
      style={{
        top: `${(startOffset + 2) * pxPerMinute}px`,
        height: `${(endOffset - startOffset - 4) * pxPerMinute}px`,
      }}
    >
      <div className="flex flex-col p-4">
        <p className="text-primary-gray-800 text-sm font-bold">{lecture.name}</p>
        <p className="text-primary-gray-500 text-xs font-bold">{lecture.professor}</p>
        <p className="text-primary-gray-600 text-xs font-medium">
          {lecture.startTime}-{lecture.endTime}
        </p>
      </div>
    </div>
  );
}
