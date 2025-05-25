'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Api from '@/api';
import { RoomResponse } from '@/api/dto/room';
import { useApi } from '@/hook/use-api';
import { useFilterStore } from '@/store/filter.store';
import { format } from 'date-fns';
import { MoveUpRight } from 'lucide-react';

export default function Page() {
  const [isApiProcessing, startApi] = useApi();

  const observerTarget = useRef(null);

  const [allRooms, setAllRooms] = useState<RoomResponse[]>([]);
  const [visibleRoomLength, setVisibleRoomLength] = useState(60);

  const { placeName, capacity, date, startTime, endTime } = useFilterStore();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleRoomLength < allRooms.length) {
        setVisibleRoomLength((prev) => prev + 60);
      }
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [visibleRoomLength, allRooms.length]);

  useEffect(() => {
    startApi(async () => {
      const { rooms } = await Api.Domain.Room.getRooms(
        placeName,
        capacity,
        date ? format(date, 'yyyy-MM-dd') : undefined,
        startTime ? format(startTime, 'HH:mm') : undefined,
        endTime ? format(endTime, 'HH:mm') : undefined,
      );
      setAllRooms(rooms);
      setVisibleRoomLength(60);
    });
  }, [placeName, capacity, date, startTime, endTime]);

  return (
    <div
      className="flex max-h-[calc(100dvh-80px-32px)] min-h-[calc(100dvh-64px)] w-full flex-col gap-6 overflow-y-auto bg-white p-8 md:min-h-auto md:rounded-2xl md:p-10"
      style={{
        background: 'radial-gradient(ellipse 150% 100% at top center, #595cff -100%, white 40%)',
      }}
    >
      <div className="flex items-center gap-6">
        <h2 className="title1-nanum text-primary-gray-600">빈 강의실 목록</h2>
        <p className="body2-nanum text-classpick-300 rounded-full border border-white bg-white/50 px-4 py-2">
          예약 가능한 강의실 {allRooms.length}
        </p>
      </div>

      <div className="scrollbar-none flex flex-wrap justify-center gap-6 overflow-y-auto md:pb-6">
        {allRooms.slice(0, visibleRoomLength).map((room) => (
          <Link
            key={room.roomId}
            href={`/${room.roomId}`}
            className="flex max-w-[315px] min-w-[250px] flex-1 flex-col rounded-xl bg-white/80 p-2 shadow-lg"
          >
            <div className="relative">
              {room.image ? (
                <Image
                  src={room.image}
                  alt={room.roomId.toString()}
                  width={300}
                  height={200}
                  className="h-[200px] rounded-xl object-cover"
                  unoptimized
                />
              ) : (
                <div className="bg-primary-gray-400 h-[200px] rounded-xl" />
              )}

              <div className="absolute bottom-0 left-0 z-10 h-[50px] w-full bg-linear-to-b from-transparent to-white" />
              <div className="absolute bottom-2 left-2 z-20 flex gap-4">
                {room.capacity && (
                  <p className="caption1-pretendard rounded-full bg-white/70 px-2 py-1">
                    수용인원 {room.capacity}명
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between p-3">
              <div className="flex flex-col">
                <p className="subtitle1-nanum text-primary-gray-600">
                  {room.placeName} {room.unitNumber}호
                </p>
                <p className="body1-nanum text-sidebar-primary">
                  {room.placeName} {room.unitNumber}호
                </p>
              </div>
              <div className="border-primary-gray-500 h-fit rounded-full border p-1">
                <MoveUpRight size={14} color="var(--color-primary-gray-500)" />
              </div>
            </div>
          </Link>
        ))}

        {!isApiProcessing && visibleRoomLength < allRooms.length && (
          <div ref={observerTarget} className="h-4 w-full" />
        )}
      </div>
    </div>
  );
}
