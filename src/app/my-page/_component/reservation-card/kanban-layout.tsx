import { ReactNode } from 'react';

import { ReservationResponse, Status } from '@/api/dto/reservation';
import { now } from '@/util';
import { differenceInDays, format, isBefore, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

interface Step {
  title: string;
  color: {
    text: string;
    background: string;
    hover: {
      border: string;
    };
  };
  filter: (reservation: ReservationResponse) => boolean;
  badge: (reservation: ReservationResponse) => ReactNode;
}

const steps: Step[] = [
  {
    title: '예약심사',
    color: {
      text: 'text-primary-gray-300',
      background: 'bg-primary-gray-300',
      hover: {
        border: 'hover:border-primary-gray-300',
      },
    },
    filter: (reservation: ReservationResponse) => reservation.status === Status.REQUESTED,
    badge: () => (
      <p className="text-primary-gray-500 body2-pretendard h-fit rounded bg-zinc-100 px-2 py-0.5">
        예약심사
      </p>
    ),
  },
  {
    title: '예약반려',
    color: {
      text: 'text-system-alarm',
      background: 'bg-system-alarm',
      hover: {
        border: 'hover:border-system-alarm',
      },
    },
    filter: (reservation: ReservationResponse) => reservation.status === Status.REJECTED,
    badge: () => (
      <p className="bg-system-alarm/10 text-system-alarm body2-pretendard h-fit rounded px-2 py-0.5">
        예약심사
      </p>
    ),
  },
  {
    title: '예약완료',
    color: {
      text: 'text-classpick-300',
      background: 'bg-classpick-300',
      hover: {
        border: 'hover:border-classpick-300',
      },
    },
    filter: (reservation: ReservationResponse) =>
      reservation.status === Status.APPROVED &&
      isBefore(
        now(),
        parse(reservation.endTime, 'HH:mm', parse(reservation.date, 'yyyy-MM-dd', new Date())),
      ),
    badge: () => (
      <p className="bg-classpick-400/10 text-classpick-400 body2-pretendard h-fit rounded px-2 py-0.5">
        예약심사
      </p>
    ),
  },
  {
    title: '이용완료',
    color: {
      text: 'text-emerald-400',
      background: 'bg-emerald-400',
      hover: {
        border: 'hover:border-emerald-400',
      },
    },
    filter: (reservation: ReservationResponse) =>
      reservation.status === Status.APPROVED &&
      !isBefore(
        now(),
        parse(reservation.endTime, 'HH:mm', parse(reservation.date, 'yyyy-MM-dd', new Date())),
      ),
    // TODO: 추후 인증 필요 조건 수정
    badge: (reservation: ReservationResponse) =>
      reservation.people === 1 ? (
        <p className="body2-pretendard h-fit rounded bg-emerald-400/10 px-2 py-0.5 text-emerald-400">
          인증필요
        </p>
      ) : (
        <p className="text-primary-gray-500 body2-pretendard h-fit rounded bg-zinc-100 px-2 py-0.5">
          인증완료
        </p>
      ),
  },
];

interface KanbanProps {
  reservations: ReservationResponse[];
}

export default function KanbanLayout({ reservations }: KanbanProps) {
  return (
    <div className="grid grid-cols-4 gap-5">
      {steps.map((step) => (
        <div key={step.title} className="flex flex-col gap-2.5">
          <p className={twMerge('caption1-nanum font-bold', step.color.text)}>{step.title}</p>
          <div className={twMerge('h-[6px] w-full rounded-full', step.color.background)} />
          <div className="scrollbar-none flex max-h-[calc(100dvh-80px-180px-52px-166px)] flex-col gap-2 overflow-y-auto">
            {reservations.filter(step.filter).map((reservation) => {
              const reservationDate = parse(reservation.date, 'yyyy-MM-dd', new Date());
              const remainDate = differenceInDays(reservationDate, now());

              return (
                <div
                  key={reservation.reservationId}
                  className={twMerge(
                    'flex cursor-pointer flex-col gap-2 rounded-lg border border-gray-50 bg-gray-50 p-4 shadow',
                    step.color.hover.border,
                  )}
                >
                  <section className="flex flex-col">
                    <div className="flex justify-between">
                      <p className="title1-nanum text-[22px]">
                        {reservation.room.placeName} {reservation.room.unitNumber}
                      </p>
                      {step.badge(reservation)}
                    </div>
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
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
