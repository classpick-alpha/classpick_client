import { Dispatch, SetStateAction } from 'react';

import { Step } from '@/app/admin/reservation/_component/reservation-card/_config/step';

import { UserReservationResponse } from '@/api/dto/reservation';
import { useModalStore } from '@/store/modal.store';
import { now } from '@/util';
import { differenceInDays, format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

interface ReservationCardProps {
  step: Step;
  reservation: UserReservationResponse;
  setReservations: Dispatch<SetStateAction<UserReservationResponse[]>>;
}

export default function ReservationCard({
  step,
  reservation,
  setReservations,
}: ReservationCardProps) {
  const { openModal } = useModalStore();

  const reservationDate = parse(reservation.date, 'yyyy-MM-dd', new Date());
  const remainDate = differenceInDays(reservationDate, now());

  return (
    <div
      className={twMerge(
        'flex cursor-pointer flex-col gap-2 rounded-lg border border-gray-50 bg-gray-50 p-4 shadow',
        step.color.hover.border,
      )}
      onClick={() => step.modal && openModal(step.modal(reservation, setReservations))}
    >
      <section className="flex flex-col">
        <p className="title1-nanum text-[22px]">
          {reservation.room.placeName} {reservation.room.unitNumber}호
        </p>
        <p className="caption1-nanum text-primary-gray-500">
          {format(reservationDate, 'yyyy년 MM월 dd일 EEEE', { locale: ko })}
        </p>
      </section>

      {remainDate > 0 ? (
        <p className={twMerge('title1-nanum text-[26px] font-bold', step.color.text)}>
          D-{remainDate}
        </p>
      ) : (
        <div className="h-7" />
      )}

      <div className="flex gap-2">
        <p className="text-sidebar-primary body1-pretendard rounded-sm bg-white p-2">
          {reservation.startTime}-{reservation.endTime}
        </p>
        <p className="text-sidebar-primary body1-pretendard rounded-sm bg-white p-2">
          {reservation.people}명
        </p>
      </div>
    </div>
  );
}
