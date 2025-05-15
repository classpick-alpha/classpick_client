import { Status } from '@/api/dto/reservation';
import { z } from 'zod';

// ======================================== Request ========================================
export const RoomCreateRequestSchema = z.object({
  placeName: z.string().min(1, '건물을 입력해주세요.'),
  unitNumber: z.string().min(1, '호실을 입력해주세요.'),
  capacity: z.number().int().min(1, '최소 1명 이상 입력해주세요.'),
  alias: z.string().optional(),
  image: z.string().optional(),
});

export type RoomCreateRequest = z.infer<typeof RoomCreateRequestSchema>;
// ======================================== Request ========================================

// ======================================== Response ========================================
export interface RoomListResponse {
  rooms: RoomResponse[];
}

export interface RoomResponse {
  roomId: number;
  placeName: string;
  unitNumber: string;
  alias: string;
  image: string | null;
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
