import { ReservationResponse, Status } from '@/api/dto/reservation';
import { now } from '@/util';
import { isBefore, parse } from 'date-fns';

export interface StateList<T extends string> {
  state: T;
  label: string;
  filter: (reservation: ReservationResponse) => boolean;
}

export type CurrentState = 'all' | 'approved' | 'rejected' | 'requested';
export type AfterState = 'all' | 'success' | 'verify';

export const currentStates: StateList<CurrentState>[] = [
  {
    state: 'all',
    label: '전체',
    filter: (reservation: ReservationResponse) =>
      (reservation.status === Status.APPROVED &&
        isBefore(
          now(),
          parse(reservation.endTime, 'HH:mm', parse(reservation.date, 'yyyy-MM-dd', new Date())),
        )) ||
      reservation.status === Status.REJECTED ||
      reservation.status === Status.REQUESTED,
  },
  {
    state: 'approved',
    label: '예약완료',
    filter: (reservation: ReservationResponse) =>
      reservation.status === Status.APPROVED &&
      isBefore(
        now(),
        parse(reservation.endTime, 'HH:mm', parse(reservation.date, 'yyyy-MM-dd', new Date())),
      ),
  },
  {
    state: 'rejected',
    label: '예약반려',
    filter: (reservation: ReservationResponse) => reservation.status === Status.REJECTED,
  },
  {
    state: 'requested',
    label: '예약심사',
    filter: (reservation: ReservationResponse) => reservation.status === Status.REQUESTED,
  },
];

export const afterStates: StateList<AfterState>[] = [
  {
    state: 'all',
    label: '전체',
    filter: (reservation) =>
      reservation.status === Status.APPROVED &&
      !isBefore(
        now(),
        parse(reservation.endTime, 'HH:mm', parse(reservation.date, 'yyyy-MM-dd', new Date())),
      ),
  },
  {
    state: 'success',
    label: '인증완료',
    filter: (reservation) =>
      reservation.status === Status.APPROVED &&
      !isBefore(
        now(),
        parse(reservation.endTime, 'HH:mm', parse(reservation.date, 'yyyy-MM-dd', new Date())),
      ) &&
      reservation.ocrVerified,
  },
  {
    state: 'verify',
    label: '인증필요',
    filter: (reservation) =>
      reservation.status === Status.APPROVED &&
      !isBefore(
        now(),
        parse(reservation.endTime, 'HH:mm', parse(reservation.date, 'yyyy-MM-dd', new Date())),
      ) &&
      !reservation.ocrVerified,
  },
];
