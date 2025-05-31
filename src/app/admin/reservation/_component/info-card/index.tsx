import { useMemo } from 'react';

import { RedirectType, redirect } from 'next/navigation';

import AdminNoShowChartModal from '@/modal/admin/admin-noshow-chart.modal';

import { ReservationResponse, Status } from '@/api/dto/reservation';
import { useModalStore } from '@/store/modal.store';
import { useUserStore } from '@/store/user.store';
import { Chart2 } from 'iconsax-react';
import { MoveLeft } from 'lucide-react';

interface InfoCardProps {
  reservations: ReservationResponse[];
}

export default function InfoCard({ reservations }: InfoCardProps) {
  const { user } = useUserStore();
  const { openModal } = useModalStore();

  const totalReservations = useMemo(() => reservations?.length, [reservations]);

  const requestedReservations = useMemo(
    () => reservations?.filter((x) => x.status === Status.REQUESTED).length,
    [reservations],
  );

  const approvedReservations = useMemo(
    () => reservations?.filter((x) => x.status === Status.APPROVED).length,
    [reservations],
  );

  const rejectedReservations = useMemo(
    () => reservations?.filter((x) => x.status === Status.REJECTED).length,
    [reservations],
  );

  if (!user) return null;

  return (
    <div className="flex flex-col gap-9 rounded-b-2xl bg-white p-6 md:rounded-2xl">
      <section className="flex justify-between">
        <button
          className="border-classpick-500 w-fit cursor-pointer rounded-full border p-2"
          onClick={() => redirect('/', RedirectType.push)}
        >
          <MoveLeft size={18} color="var(--color-classpick-500)" />
        </button>

        <button
          className="border-classpick-400 flex cursor-pointer items-center gap-1 rounded-sm border bg-gray-50 px-3 py-1"
          onClick={() => {
            openModal(<AdminNoShowChartModal />);
          }}
        >
          <Chart2 color="var(--color-classpick-400)" size={20} />
          <p className="body2-nanum text-classpick-400">노쇼 차트</p>
        </button>
      </section>

      <section className="flex flex-col gap-2 lg:flex-row lg:gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="title1-nanum text-primary-gray-600">예약 현황</h2>
          <h2 className="body1-nanum text-primary-gray-600">예약심사 현황</h2>
        </div>

        <div className="text-red h-full border-l border-zinc-500/10" />

        <div className="flex gap-8 self-center lg:gap-5">
          <div className="flex flex-col items-center gap-1">
            <p className="caption1-nanum text-primary-gray-600">총 예약 수</p>
            <p className="title1-nanum text-primary-gray-600">{totalReservations}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="caption1-nanum text-primary-gray-600">예약 요청</p>
            <p className="title1-nanum text-primary-gray-600">{requestedReservations}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="caption1-nanum text-primary-gray-600">예약 완료</p>
            <p className="title1-nanum text-primary-gray-600">{approvedReservations}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="caption1-nanum text-primary-gray-600">예약 반려</p>
            <p className="title1-nanum text-primary-gray-600">{rejectedReservations}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
