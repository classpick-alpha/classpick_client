'use client';

import { useEffect, useState } from 'react';

import InfoCard from '@/app/my-page/_component/info-card';
import ReservationCard from '@/app/my-page/_component/reservation-card';

import Api from '@/api';
import { ReservationResponse } from '@/api/dto/reservation';
import { useApi } from '@/hook/use-api';

export default function Page() {
  const [isApiProcessing, startApi] = useApi();

  const [reservations, setReservations] = useState<ReservationResponse[]>([]);

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
      <ReservationCard reservations={reservations} />
    </div>
  );
}
