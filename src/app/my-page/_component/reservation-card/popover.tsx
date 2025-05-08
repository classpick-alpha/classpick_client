import { useState } from 'react';

import { CircleCheck } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export function Popover() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="size-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <path
          d="M2 12.9385C2 8.22443 2 5.86741 3.46447 4.40294C4.92893 2.93848 7.28595 2.93848 12 2.93848C16.714 2.93848 19.0711 2.93848 20.5355 4.40294C22 5.86741 22 8.22443 22 12.9385C22 17.6525 22 20.0095 20.5355 21.474C19.0711 22.9385 16.714 22.9385 12 22.9385C7.28595 22.9385 4.92893 22.9385 3.46447 21.474C2 20.0095 2 17.6525 2 12.9385Z"
          fill="#3C3B41"
          stroke="#3C3B41"
          strokeWidth="1.5"
        />
        <path
          d="M10.125 9.81348C10.125 8.77794 10.9645 7.93848 12 7.93848C13.0355 7.93848 13.875 8.77794 13.875 9.81348C13.875 10.5009 13.505 11.102 12.9534 11.4284C12.478 11.7096 12 12.1362 12 12.6885V13.9385"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16.9385" r="1" fill="white" />
      </svg>
      <div
        className={twMerge(
          'absolute bottom-0 left-9 z-20 flex w-fit translate-y-1/2 flex-col gap-3 rounded-lg bg-gray-800 px-2 py-3 text-sm text-white',
          !isHovered && 'hidden',
        )}
      >
        <p className="body2-nanum text-white">나의 예약 현황을 한번에 확인해요</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <CircleCheck size={14} />
            <p className="caption2-nanum text-white">예약반려 사유 확인 후, 추가 서류제출</p>
          </div>
          <div className="flex items-center gap-1">
            <CircleCheck size={14} />
            <p className="caption2-nanum text-white">강의실이 사용한 후, 인증사진 업로드</p>
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          'absolute top-1 left-8 z-10 size-4 rotate-45 bg-gray-800',
          !isHovered && 'hidden',
        )}
      />
    </div>
  );
}
