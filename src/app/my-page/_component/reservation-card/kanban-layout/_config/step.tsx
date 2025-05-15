import { Dispatch, ReactNode, SetStateAction } from 'react';

import ReserveDetailModal from '@/modal/reserve-detail.modal';
import ReserveRejectedDetailModal from '@/modal/reserve-rejected-detail.modal';
import ReserveSuccessDetailModal from '@/modal/reserve-success-detail.modal';

import { ReservationResponse, Status } from '@/api/dto/reservation';
import { now } from '@/util';
import { isBefore, parse } from 'date-fns';

export interface Step {
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
  modal?: (
    reservation: ReservationResponse,
    setReservations: Dispatch<SetStateAction<ReservationResponse[]>>,
  ) => ReactNode;
}

export const steps: Step[] = [
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
    modal: (
      reservation: ReservationResponse,
      setReservations: Dispatch<SetStateAction<ReservationResponse[]>>,
    ) => <ReserveDetailModal reservation={reservation} setReservations={setReservations} />,
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
        예약반려
      </p>
    ),
    modal: (reservation) => <ReserveRejectedDetailModal reservation={reservation} />,
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
    badge: (reservation: ReservationResponse) =>
      reservation.ocrVerified ? (
        <p className="text-primary-gray-500 body2-pretendard h-fit rounded bg-zinc-100 px-2 py-0.5">
          인증완료
        </p>
      ) : (
        <p className="body2-pretendard h-fit rounded bg-emerald-400/10 px-2 py-0.5 text-emerald-400">
          인증필요
        </p>
      ),
    modal: (
      reservation: ReservationResponse,
      setReservations: Dispatch<SetStateAction<ReservationResponse[]>>,
    ) =>
      !reservation.ocrVerified && (
        <ReserveSuccessDetailModal reservation={reservation} setReservations={setReservations} />
      ),
  },
];
