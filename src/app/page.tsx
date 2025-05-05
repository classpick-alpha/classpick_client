'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { MoveUpRight } from 'lucide-react';

interface RoomType {
  roomId: number;
  roomName: string;
  image: string;
  capacity: number;
  roomType: string;
}

const MOCK_ROOM_DATE: RoomType[] = [
  {
    roomId: 1,
    roomName: '미래관 424호',
    image: 'https://i.imgur.com/Wd55yWI.png',
    capacity: 40,
    roomType: '강의실',
  },
];

export default function Page() {
  const [rooms] = useState<RoomType[]>(MOCK_ROOM_DATE);

  return (
    <div
      className="flex max-h-[calc(100dvh-80px-32px)] w-full flex-col gap-6 overflow-y-auto rounded-2xl bg-white px-12 py-11"
      style={{
        background: 'radial-gradient(ellipse 150% 100% at top center, #595cff -100%, white 40%)',
      }}
    >
      <div className="flex items-center gap-6">
        <h2 className="title1-nanum text-primary-gray-600">빈 강의실 목록</h2>
        <p className="body2-nanum text-classpick-300 rounded-full border border-white bg-white/50 px-4 py-2">
          예약 가능한 강의실 {rooms.length}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rooms.map((room) => (
          <Link
            key={room.roomId}
            href={`/${room.roomId}`}
            className="flex flex-col rounded-xl bg-white/80 p-2 shadow-lg"
          >
            <div className="relative">
              <Image
                src={room.image}
                alt={room.roomName}
                width={512}
                height={512}
                className="h-[200px] rounded-xl object-cover"
              />
              <div className="absolute bottom-0 left-0 z-10 h-[50px] w-full bg-linear-to-b from-transparent to-white" />
              <div className="absolute bottom-2 left-2 z-20 flex gap-4">
                <p className="caption1-pretendard rounded-full bg-white/70 px-2 py-1">
                  수용인원 {room.capacity}명
                </p>
              </div>
            </div>
            <div className="flex justify-between p-3">
              <div className="flex flex-col">
                <p className="subtitle1-nanum text-primary-gray-600">{room.roomName}</p>
                <p className="body1-nanum text-sidebar-primary">{room.roomType}</p>
              </div>
              <div className="border-primary-gray-500 h-fit rounded-full border p-1">
                <MoveUpRight size={14} color="var(--color-primary-gray-500)" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
