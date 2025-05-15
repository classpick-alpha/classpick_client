import { Dispatch, SetStateAction } from 'react';

import ReserveDetailModal from '@/modal/reserve-detail.modal';
import ReserveRejectedDetailModal from '@/modal/reserve-rejected-detail.modal';
import ReserveSuccessDetailModal from '@/modal/reserve-success-detail.modal';

import { ReservationResponse, Status } from '@/api/dto/reservation';
import { useModalStore } from '@/store/modal.store';
import { now } from '@/util';
import { differenceInDays, format, isBefore, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

interface ReservationCardProps {
  reservation: ReservationResponse;
  setReservations: Dispatch<SetStateAction<ReservationResponse[]>>;
}

export default function ReservationCard({ reservation, setReservations }: ReservationCardProps) {
  const { openModal } = useModalStore();

  const reservationDate = parse(reservation.date, 'yyyy-MM-dd', new Date());
  const remainDate = differenceInDays(reservationDate, now());

  const status =
    reservation.status === Status.REQUESTED
      ? '예약심사'
      : reservation.status === Status.REJECTED
        ? '예약반려'
        : reservation.status === Status.APPROVED &&
            isBefore(
              now(),
              parse(
                reservation.endTime,
                'HH:mm',
                parse(reservation.date, 'yyyy-MM-dd', new Date()),
              ),
            )
          ? '예약완료'
          : reservation.status === Status.APPROVED &&
              !isBefore(
                now(),
                parse(
                  reservation.endTime,
                  'HH:mm',
                  parse(reservation.date, 'yyyy-MM-dd', new Date()),
                ),
              ) &&
              reservation.ocrVerified
            ? '인증완료'
            : '인증필요';

  return (
    <div
      className="group hover:border-classpick-500 flex min-w-[300px] cursor-pointer flex-col gap-2 rounded-lg border border-gray-50 bg-gray-50 p-4 shadow"
      onClick={() => {
        if (status === '예약심사') {
          openModal(
            <ReserveDetailModal reservation={reservation} setReservations={setReservations} />,
          );
        } else if (status === '예약반려') {
          openModal(<ReserveRejectedDetailModal reservation={reservation} />);
        } else if (status === '인증필요') {
          openModal(
            <ReserveSuccessDetailModal
              reservation={reservation}
              setReservations={setReservations}
            />,
          );
        }
      }}
    >
      <section className="flex flex-col">
        <div className="flex gap-2.5">
          <p className="title1-nanum text-[22px]">
            {reservation.room.placeName} {reservation.room.unitNumber}호
          </p>
          <p
            className={twMerge(
              'text-classpick-500 body2-pretendard bg-classpick-500/10 h-fit rounded px-2 py-0.5',
              status === '예약반려' && 'text-system-alarm bg-system-alarm/10',
              status === '인증필요' && 'bg-emerald-400/10 text-emerald-400',
            )}
          >
            {status}
          </p>
        </div>
        <p className="caption1-nanum text-primary-gray-500">
          {format(reservationDate, 'yyyy년 MM월 dd일 EEEE', { locale: ko })}
        </p>
      </section>

      <section className="flex gap-4">
        <div className="flex gap-2">
          <p className="text-sidebar-primary group-hover:text-classpick-500 body1-pretendard rounded-sm bg-white p-2">
            {reservation.startTime}-{reservation.endTime}
          </p>
          <p className="text-sidebar-primary group-hover:text-classpick-500 body1-pretendard rounded-sm bg-white p-2">
            {reservation.people}명
          </p>
        </div>
        {remainDate > 0 && (
          <p
            className={twMerge(
              'title1-nanum text-sidebar-primary group-hover:text-classpick-500 text-[26px] font-bold',
            )}
          >
            D-{remainDate}
          </p>
        )}
      </section>
    </div>
  );
}
