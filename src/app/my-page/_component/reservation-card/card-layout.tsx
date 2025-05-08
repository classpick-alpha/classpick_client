import { ReservationResponse } from '@/api/dto/reservation';

interface CardProps {
  reservations: ReservationResponse[];
}

export default function CardLayout({ reservations }: CardProps) {
  return <p>{JSON.stringify(reservations, null, 2)}</p>;
}
