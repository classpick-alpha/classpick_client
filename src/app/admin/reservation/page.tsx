'use client';

import { useEffect, useState } from 'react';

import InfoCard from '@/app/admin/reservation/_component/info-card';
import ReservationCard from '@/app/admin/reservation/_component/reservation-card';

import Api from '@/api';
import { UserReservationResponse } from '@/api/dto/reservation';
import { useApi } from '@/hook/use-api';

export default function AdminReservationPage() {
  const [isApiProcessing, startApi] = useApi();

  const [reservations, setReservations] = useState<UserReservationResponse[]>([]);

  useEffect(() => {
    startApi(async () => {
      const { userReservations } = await Api.Domain.ReservationAdmin.getUserReservationsList();
      setReservations(userReservations);
    });
  }, []);

  if (isApiProcessing) return null;

  return (
    <div className="flex w-full flex-col gap-2">
      <InfoCard reservations={reservations} />
      <ReservationCard reservations={reservations} setReservations={setReservations} />
    </div>
  );
}
