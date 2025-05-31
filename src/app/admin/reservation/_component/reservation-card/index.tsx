import { Dispatch, SetStateAction } from 'react';

import { steps } from '@/app/admin/reservation/_component/reservation-card/_config/step';
import ReservationCard2 from '@/app/admin/reservation/_component/reservation-card/reservation-card';

import { UserReservationResponse } from '@/api/dto/reservation';
import { parse } from 'date-fns';
import { twMerge } from 'tailwind-merge';

interface ReservationCardProps {
  reservations: UserReservationResponse[];
  setReservations: Dispatch<SetStateAction<UserReservationResponse[]>>;
}

export default function ReservationCard({ reservations, setReservations }: ReservationCardProps) {
  return (
    <div className="scrollbar-none flex h-full flex-col gap-6 overflow-y-auto rounded-t-2xl bg-white p-8 pb-4 md:max-h-[calc(100dvh-80px-180px-180px)] md:rounded-2xl lg:max-h-[calc(100dvh)]">
      <div className="flex justify-between">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-primary-gray-600 title2-nanum font-bold">현재 예약 현황</h2>
          </div>
          <p className="caption1-nanum">현재까지 예약된 강의실의 신청 현황입니다.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {steps.map((step) => (
          <div
            key={step.title}
            className={twMerge('flex flex-col gap-2.5', step.large && 'col-span-2')}
          >
            <p className={twMerge('caption1-nanum font-bold', step.color.text)}>{step.title}</p>
            <div className={twMerge('h-[6px] w-full rounded-full', step.color.background)} />
            <div
              className={twMerge(
                'scrollbar-none max-h-[calc(100dvh-80px-180px-52px-166px)] gap-2 overflow-y-auto p-0.5',
                step.large ? 'grid grid-cols-2' : 'flex flex-col',
              )}
            >
              {reservations
                .filter(step.filter)
                .sort(
                  (a, b) =>
                    parse(a.date, 'yyyy-MM-dd', new Date()).getTime() -
                    parse(b.date, 'yyyy-MM-dd', new Date()).getTime(),
                )
                .map((reservation) => (
                  <ReservationCard2
                    key={reservation.reservationId}
                    step={step}
                    reservation={reservation}
                    setReservations={setReservations}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
