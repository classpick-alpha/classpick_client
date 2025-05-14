import { UploadImageResponse } from '@/api/dto/common';
import {
  CreateReservationRequest,
  ReservationListResponse,
  ReservationResponse,
} from '@/api/dto/reservation';
import ApiRequest from '@/api/request';

export default class Reservation {
  constructor(private readonly request: ApiRequest) {}

  public async createReservation(
    roomId: number,
    body: CreateReservationRequest,
  ): Promise<ReservationResponse> {
    return this.request.post(`/v0.0/reservations/${roomId}`, body);
  }

  public async cancelReservation(reservationId: number): Promise<void> {
    return this.request.delete(`/v0.0/reservations/${reservationId}`);
  }

  public async getReservationsList(): Promise<ReservationListResponse> {
    return this.request.get('/v0.0/reservations');
  }

  public async generateOcrImage(reservationId: number): Promise<UploadImageResponse> {
    return this.request.post(`/v0.0/reservations/${reservationId}/ocr/url`);
  }

  public async generateCleanUpImage(reservationId: number): Promise<UploadImageResponse> {
    return this.request.post(`/v0.0/reservations/${reservationId}/clean-up/url`);
  }
}
