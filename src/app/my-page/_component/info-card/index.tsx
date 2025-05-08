import { useMemo } from 'react';

import { RedirectType, redirect } from 'next/navigation';

import { ReservationResponse, Status } from '@/api/dto/reservation';
import { useUserStore } from '@/store/user.store';
import { Headphones, MoveLeft } from 'lucide-react';

interface InfoCardProps {
  reservations: ReservationResponse[];
}

export default function InfoCard({ reservations }: InfoCardProps) {
  const { user } = useUserStore();

  const totalReservations = useMemo(() => reservations?.length, [reservations]);

  const approvedReservations = useMemo(
    () => reservations?.filter((x) => x.status === Status.APPROVED).length,
    [reservations],
  );

  const rejectedReservations = useMemo(
    () => reservations?.filter((x) => x.status === Status.REJECTED).length,
    [reservations],
  );

  const requestedReservations = useMemo(
    () => reservations?.filter((x) => x.status === Status.REQUESTED).length,
    [reservations],
  );

  if (!user) return null;

  return (
    <div className="flex flex-col gap-9 rounded-2xl bg-white p-6">
      <section className="flex justify-between">
        <button
          className="border-classpick-500 w-fit cursor-pointer rounded-full border p-2"
          onClick={() => redirect('/', RedirectType.push)}
        >
          <MoveLeft size={18} color="var(--color-classpick-500)" />
        </button>

        <button className="border-classpick-400 flex cursor-pointer items-center gap-1 rounded-sm border bg-gray-50 px-3 py-1">
          <Headphones color="var(--color-classpick-400)" size={20} />
          {/*TODO: 누르면 어떤 일이 일어나나요?*/}
          <p className="body2-nanum text-classpick-400">담당자 연결</p>
        </button>
      </section>

      <section className="flex gap-9">
        <div className="flex flex-col gap-2">
          <h2 className="title1-nanum text-primary-gray-600">마이페이지</h2>
          <h2 className="body1-nanum text-primary-gray-600">예약내역</h2>
        </div>

        <div className="text-red h-full border-l border-zinc-500/10" />

        <div className="flex flex-col gap-1">
          <h3 className="subtitle2-pretendard text-primary-gray-600">재학생 정보</h3>
          <div className="grid grid-cols-3 gap-1">
            <p className="text-classpick-500 body1-pretendard rounded-sm bg-gray-50 p-2 text-center">
              {user.schoolNumber}
            </p>
            <p className="text-classpick-500 body1-pretendard rounded-sm bg-gray-50 p-2 text-center">
              {user.userGroup.split(' ', 2)[1]}
            </p>
            <p className="text-classpick-500 body1-pretendard rounded-sm bg-gray-50 p-2 text-center">
              {user.name}
            </p>
          </div>
        </div>

        <div className="text-red h-full border-l border-zinc-500/10" />

        <div className="flex gap-5">
          <div className="flex flex-col items-center gap-1">
            <p className="caption1-nanum text-primary-gray-600">총 예약 수</p>
            <p className="title1-nanum text-primary-gray-600">{totalReservations}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="caption1-nanum text-primary-gray-600">예약 완료</p>
            <p className="title1-nanum text-primary-gray-600">{approvedReservations}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="caption1-nanum text-primary-gray-600">예약 반려</p>
            <p className="title1-nanum text-primary-gray-600">{rejectedReservations}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="caption1-nanum text-primary-gray-600">예약 심사</p>
            <p className="title1-nanum text-primary-gray-600">{requestedReservations}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
