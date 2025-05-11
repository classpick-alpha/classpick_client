import { steps } from '@/app/my-page/_component/reservation-card/kanban-layout/_config/step';
import ReservationCard from '@/app/my-page/_component/reservation-card/kanban-layout/reservation-card';

import { ReservationResponse } from '@/api/dto/reservation';
import { twMerge } from 'tailwind-merge';

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
            {reservations.filter(step.filter).map((reservation) => (
              <ReservationCard
                key={reservation.reservationId}
                step={step}
                reservation={reservation}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
