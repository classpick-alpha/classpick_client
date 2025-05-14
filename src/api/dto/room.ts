import { Status } from '@/api/dto/reservation';

// ======================================== Response ========================================
export interface RoomListResponse {
  rooms: RoomResponse[];
}

export interface RoomResponse {
  roomId: number;
  image: string;
  placeName: string;
  unitNumber: string;
  capacity: number | null;
}

export interface User {
  userId: number;
  name: string;
}

export interface TimeReservations {
  startTime: string;
  endTime: string;
  status: Status;
  user: User;
}

export interface DailyReservation {
  date: string;
  reservations: TimeReservations[];
}

export interface RoomTimeTableResponse {
  room: RoomResponse;
  weekly: DailyReservation[];
}
// ======================================== Response ========================================
