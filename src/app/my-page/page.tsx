'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import InfoCard from '@/app/my-page/_component/info-card';
import { Popover } from '@/app/my-page/_component/popover';

import EmptyReservationsImage from '@/public/my-page/empty-reservations.png';

import Api from '@/api';
import { ReservationResponse, Status } from '@/api/dto/reservation';
import { useApi } from '@/hook/use-api';
import { now } from '@/util';
import { differenceInDays, format, isBefore, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Kanban } from 'iconsax-react';
import { LayoutGrid } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type LayoutType = 'kanban' | 'grid';

const steps = [
  {
    title: '예약심사',
    textColor: 'text-primary-gray-300',
    bgColor: 'bg-primary-gray-300',
    borderColor: 'hover:border-primary-gray-300',
    filter: (reservation: ReservationResponse) => reservation.status === Status.REQUESTED,
    renderBadge: () => (
      <p className="text-primary-gray-500 body2-pretendard h-fit rounded bg-zinc-100 px-2 py-0.5">
        예약심사
      </p>
    ),
  },
  {
    title: '예약반려',
    textColor: 'text-system-alarm',
    bgColor: 'bg-system-alarm',
    borderColor: 'hover:border-system-alarm',
    filter: (reservation: ReservationResponse) => reservation.status === Status.REJECTED,
    renderBadge: () => (
      <p className="bg-system-alarm/10 text-system-alarm body2-pretendard h-fit rounded px-2 py-0.5">
        예약심사
      </p>
    ),
  },
  {
    title: '예약완료',
    textColor: 'text-classpick-300',
    bgColor: 'bg-classpick-300',
    borderColor: 'hover:border-classpick-300',
    filter: (reservation: ReservationResponse) =>
      reservation.status === Status.APPROVED &&
      isBefore(
        now(),
        parse(reservation.endTime, 'HH:mm', parse(reservation.date, 'yyyy-MM-dd', new Date())),
      ),
    renderBadge: () => (
      <p className="bg-classpick-400/10 text-classpick-400 body2-pretendard h-fit rounded px-2 py-0.5">
        예약심사
      </p>
    ),
  },
  {
    title: '이용완료',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-400',
    borderColor: 'hover:border-emerald-400',
    filter: (reservation: ReservationResponse) =>
      reservation.status === Status.APPROVED &&
      !isBefore(
        now(),
        parse(reservation.endTime, 'HH:mm', parse(reservation.date, 'yyyy-MM-dd', new Date())),
      ),
    renderBadge: (reservation: ReservationResponse) =>
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

export default function Page() {
  const [isApiProcessing, startApi] = useApi();

  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [layoutType, setLayoutType] = useState<LayoutType>('kanban');

  useEffect(() => {
    startApi(async () => {
      const { reservations } = await Api.Domain.Reservation.getReservationsList();
      setReservations(reservations);
    });
  }, []);

  if (isApiProcessing) return null;

  return (
    <div className="flex w-full flex-col gap-2">
      <InfoCard reservations={reservations} />

      <div className="flex h-full flex-col gap-8 rounded-2xl bg-white p-8 pb-4">
        <div className="flex justify-between">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-primary-gray-600 title2-nanum font-bold">현재 예약 현황</h2>
              <Popover />
            </div>
            <p className="caption1-nanum">현재까지 예약된 강의실의 신청 현황입니다.</p>
          </div>

          <div className="flex gap-2">
            <LayoutGrid
              size={24}
              className="cursor-pointer"
              color={
                layoutType === 'grid' ? 'var(--color-classpick-500)' : 'var(--color-classpick-100)'
              }
              onClick={() => setLayoutType('grid')}
            />
            <Kanban
              size={24}
              className="cursor-pointer"
              color={
                layoutType === 'kanban'
                  ? 'var(--color-classpick-500)'
                  : 'var(--color-classpick-100)'
              }
              onClick={() => setLayoutType('kanban')}
            />
          </div>
        </div>

        {layoutType === 'kanban' ? (
          <>
            <div className="grid grid-cols-4 gap-5">
              {steps.map((step) => (
                <div key={step.title} className="flex flex-col gap-2.5">
                  <p className={twMerge('caption1-nanum font-bold', step.textColor)}>
                    {step.title}
                  </p>
                  <div className={twMerge('h-[6px] w-full rounded-full', step.bgColor)} />
                  <div className="flex max-h-[calc(100dvh-80px-180px-52px-166px)] flex-col gap-2 overflow-y-auto">
                    {reservations.filter(step.filter).map((reservation) => {
                      const reservationDate = parse(reservation.date, 'yyyy-MM-dd', new Date());
                      const dDay = differenceInDays(reservationDate, now());

                      return (
                        <div
                          key={reservation.reservationId}
                          className={twMerge(
                            'flex cursor-pointer flex-col gap-2 rounded-lg border border-gray-50 bg-gray-50 p-4 shadow',
                            step.borderColor,
                          )}
                        >
                          <section className="flex flex-col">
                            <div className="flex justify-between">
                              <p className="title1-nanum text-[22px]">
                                {reservation.room.placeName} {reservation.room.unitNumber}
                              </p>
                              {step.renderBadge(reservations)}
                            </div>
                            <p className="caption1-nanum text-primary-gray-500">
                              {format(reservationDate, 'yyyy년 MM월 dd일 EEEE', { locale: ko })}
                            </p>
                          </section>

                          {dDay > 0 ? (
                            <p className={twMerge('title1-nanum font-[26px]', step.textColor)}>
                              D-{dDay}
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

            {reservations.length === 0 && (
              <div className="my-auto flex w-fit items-center gap-20 self-center rounded-2xl bg-gray-50 py-4 pr-24 pl-4">
                <Image
                  src={EmptyReservationsImage}
                  alt="empty-reservations"
                  width={200}
                  height={200}
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
                    className="body2-nanum bg-classpick-500 w-fit rounded-full px-8 py-4 text-base text-white"
                  >
                    나에게 맞는 강의실 예약하러 가기
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
