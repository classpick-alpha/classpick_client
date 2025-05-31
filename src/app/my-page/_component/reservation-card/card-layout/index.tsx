import { Dispatch, SetStateAction, useState } from 'react';

import {
  AfterState,
  CurrentState,
  StateList,
  afterStates,
  currentStates,
} from '@/app/my-page/_component/reservation-card/card-layout/_config/states';
import ReservationCard from '@/app/my-page/_component/reservation-card/card-layout/reservation-card';

import { ReservationResponse } from '@/api/dto/reservation';
import { parse } from 'date-fns';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  reservations: ReservationResponse[];
  setReservations: Dispatch<SetStateAction<ReservationResponse[]>>;
}

export default function CardLayout({ reservations, setReservations }: CardProps) {
  const [currentState, setCurrentState] = useState<StateList<CurrentState>>(currentStates[0]);
  const [afterState, setAfterState] = useState<StateList<AfterState>>(afterStates[0]);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {currentStates.map((state) => (
            <button
              key={state.state}
              className={twMerge(
                'caption1-nanum w-fit cursor-pointer rounded-lg border px-4 py-2 text-sm font-bold',
                currentState.state === state.state
                  ? 'border-classpick-500 text-classpick-500'
                  : 'border-primary-gray-400 text-primary-gray-400',
              )}
              onClick={() => setCurrentState(state)}
            >
              {state.label}
            </button>
          ))}
        </div>
        <div className="scrollbar-none flex max-w-[calc(100dvw-64px)] gap-3 overflow-x-auto p-0.5 md:max-w-[calc(100dvw-300px-32px-64px)]">
          {reservations
            .filter(currentState.filter)
            .sort(
              (a, b) =>
                parse(a.date, 'yyyy-MM-dd', new Date()).getTime() -
                parse(b.date, 'yyyy-MM-dd', new Date()).getTime(),
            )
            .map((reservation) => (
              <ReservationCard
                key={reservation.reservationId}
                reservation={reservation}
                setReservations={setReservations}
              />
            ))}
        </div>
      </section>

      <hr className="border-neutral-200" />

      <section className="flex flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-primary-gray-600 title2-nanum font-bold">강의실 이용 내역</h2>
          </div>
          <p className="caption1-nanum">
            예약한 강의실을 사용한 후, 이용 완료를 인증할 수 있도록 사용한 강의실 사진을 제출해
            주세요.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {afterStates.map((state) => (
              <button
                key={state.state}
                className={twMerge(
                  'caption1-nanum w-fit cursor-pointer rounded-lg border px-4 py-2 text-sm font-bold',
                  afterState.state === state.state
                    ? 'border-classpick-500 text-classpick-500'
                    : 'border-primary-gray-400 text-primary-gray-400',
                )}
                onClick={() => setAfterState(state)}
              >
                {state.label}
              </button>
            ))}
          </div>
          <div className="scrollbar-none flex max-w-[calc(100dvw-64px)] gap-3 overflow-x-auto p-0.5 md:max-w-[calc(100dvw-300px-32px-64px)]">
            {reservations.filter(afterState.filter).map((reservation) => (
              <ReservationCard
                key={reservation.reservationId}
                reservation={reservation}
                setReservations={setReservations}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
