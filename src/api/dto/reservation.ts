import { RoomResponse } from '@/api/dto/room';
import { LocalDatePattern, LocalTimePattern } from '@/api/validation';
import { z } from 'zod';

// ======================================== Constant ========================================
export enum Status {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REQUESTED = 'REQUESTED',
}
// ======================================== Constant ========================================

// ======================================== Request ========================================
export const CreateReservationRequestSchema = z.object({
  date: z.string().regex(LocalDatePattern, '올바른 날짜가 아닙니다.'),
  startTime: z.string().regex(LocalTimePattern, '올바른 시간이 아닙니다.'),
  endTime: z.string().regex(LocalTimePattern, '올바른 시간이 아닙니다.'),
  people: z.number().int('정수로 입력해주세요.').min(1, '최소 인원은 1명입니다.'),
  purpose: z.string().min(1, '사용목적을 입력해주세요.'),
  comment: z.string(),
});

export const OcrRequestSchema = z.object({
  imageUrl: z.string(),
});

export type OcrRequest = z.infer<typeof OcrRequestSchema>;
export type CreateReservationRequest = z.infer<typeof CreateReservationRequestSchema>;
// ======================================== Request ========================================

// ======================================== Response ========================================
export interface ReservationResponse {
  room: RoomResponse;
  reservationId: number;
  date: string;
  startTime: string;
  endTime: string;
  people: number;
  purpose: string;
  status: Status;
  ocrVerified: boolean;
}

export interface ReservationListResponse {
  reservations: ReservationResponse[];
}

export interface OcrResponse {
  success: boolean;
}
// ======================================== Response ========================================
