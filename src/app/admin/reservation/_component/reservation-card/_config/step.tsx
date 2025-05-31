import { Dispatch, ReactNode, SetStateAction } from 'react';

import AdminReserveApproveModal from '@/modal/admin/admin-reserve-approve.modal';
import AdminReserveDetailModal from '@/modal/admin/admin-reserve-detail.modal';

import { Status, UserReservationResponse } from '@/api/dto/reservation';
import { now } from '@/util';
import { isBefore, parse } from 'date-fns';

export interface Step {
  title: string;
  large?: boolean;
  color: {
    text: string;
    background: string;
    hover: {
      border: string;
    };
  };
  filter: (reservation: UserReservationResponse) => boolean;
  modal?: (
    reservation: UserReservationResponse,
    setReservations: Dispatch<SetStateAction<UserReservationResponse[]>>,
  ) => ReactNode;
}

export const steps: Step[] = [
  {
    title: '예약신청',
    large: true,
    color: {
      text: 'text-primary-gray-300',
      background: 'bg-primary-gray-300',
      hover: {
        border: 'hover:border-primary-gray-300',
      },
    },
    filter: (reservation: UserReservationResponse) => reservation.status === Status.REQUESTED,
    modal: (
      reservation: UserReservationResponse,
      setReservations: Dispatch<SetStateAction<UserReservationResponse[]>>,
    ) => <AdminReserveApproveModal reservation={reservation} setReservations={setReservations} />,
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
    filter: (reservation: UserReservationResponse) =>
      reservation.status === Status.APPROVED &&
      isBefore(
        now(),
        parse(reservation.endTime, 'HH:mm', parse(reservation.date, 'yyyy-MM-dd', new Date())),
      ),
    modal: (reservation: UserReservationResponse) => (
      <AdminReserveDetailModal reservation={reservation} />
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
    filter: (reservation: UserReservationResponse) =>
      reservation.status === Status.APPROVED &&
      !isBefore(
        now(),
        parse(reservation.endTime, 'HH:mm', parse(reservation.date, 'yyyy-MM-dd', new Date())),
      ),
    modal: (reservation: UserReservationResponse) => (
      <AdminReserveDetailModal reservation={reservation} />
    ),
  },
];
