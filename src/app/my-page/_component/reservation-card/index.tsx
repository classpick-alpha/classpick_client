import Image from 'next/image';
import Link from 'next/link';

import CardLayout from '@/app/my-page/_component/reservation-card/card-layout';
import KanbanLayout from '@/app/my-page/_component/reservation-card/kanban-layout';
import { Popover } from '@/app/my-page/_component/reservation-card/popover';

import EmptyReservationsImage from '@/public/my-page/empty-reservations.png';

import { ReservationResponse } from '@/api/dto/reservation';
import { Kanban } from 'iconsax-react';
import { LayoutGrid } from 'lucide-react';
import { useQueryState } from 'nuqs';

type LayoutType = 'kanban' | 'card';

interface ReservationCardProps {
  reservations: ReservationResponse[];
}

export default function ReservationCard({ reservations }: ReservationCardProps) {
  const [layoutType, setLayoutType] = useQueryState<LayoutType>('layout', {
    defaultValue: 'kanban',
    clearOnDefault: false,
    parse: (value) => value as LayoutType,
    serialize: (value) => value as string,
  });

  return (
    <div className="scrollbar-none flex h-full max-h-[calc(100dvh-80px-180px-40px)] flex-col gap-6 overflow-y-auto rounded-2xl bg-white p-8 pb-4">
      <div className="flex justify-between">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-primary-gray-600 title2-nanum font-bold">현재 예약 현황</h2>
            {layoutType === 'kanban' && <Popover />}
          </div>
          <p className="caption1-nanum">현재까지 예약된 강의실의 신청 현황입니다.</p>
        </div>

        {reservations.length > 0 && (
          <div className="flex gap-2">
            <Kanban
              size={24}
              color={
                layoutType === 'kanban'
                  ? 'var(--color-classpick-500)'
                  : 'var(--color-classpick-100)'
              }
              className="cursor-pointer"
              onClick={() => setLayoutType('kanban')}
            />
            <LayoutGrid
              size={24}
              color={
                layoutType === 'card' ? 'var(--color-classpick-500)' : 'var(--color-classpick-100)'
              }
              className="cursor-pointer"
              onClick={() => setLayoutType('card')}
            />
          </div>
        )}
      </div>

      {reservations.length > 0 ? (
        layoutType === 'kanban' ? (
          <KanbanLayout reservations={reservations} />
        ) : (
          <CardLayout reservations={reservations} />
        )
      ) : (
        <div className="my-auto flex w-fit items-center gap-20 self-center rounded-2xl bg-gray-50 py-4 pr-24 pl-4">
          <Image
            src={EmptyReservationsImage}
            alt="empty-reservations"
            width={200}
            height={200}
            priority
          />

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="title1-nanum text-zinc-800">예약한 강의실이 없습니다</h2>
              <h2 className="body1-nanum text-zinc-800">
                아직 예약 신청한 경험이 없네요.
                <br />
                예약하러 가볼까요?
              </h2>
            </div>
            <Link
              href="/"
              className="body2-nanum bg-classpick-500 w-fit rounded-full px-8 py-4 text-base font-extrabold text-white"
            >
              나에게 맞는 강의실 예약하러 가기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
