import { UploadImageResponse } from '@/api/dto/common';
import {
  CreateReservationRequest,
  NoshowListResponse,
  OcrRequest,
  OcrResponse,
  ReservationListResponse,
  ReservationResponse,
  UserReservationListResponse,
} from '@/api/dto/reservation';
import ApiRequest from '@/api/request';

export class ReservationController {
  constructor(private readonly request: ApiRequest) {}

  public async getReservationsList(): Promise<ReservationListResponse> {
    return this.request.get('/v0.0/reservations');
  }

  public async createReservation(
    roomId: number,
    body: CreateReservationRequest,
  ): Promise<ReservationResponse> {
    return this.request.post(`/v0.0/reservations/${roomId}`, body);
  }

  public async cancelReservation(reservationId: number): Promise<void> {
    return this.request.delete(`/v0.0/reservations/${reservationId}`);
  }

  public async generateOcrImage(reservationId: number): Promise<UploadImageResponse> {
    return this.request.post(`/v0.0/reservations/${reservationId}/ocr/url`);
  }

  public async verifyOcr(reservationId: number, data: OcrRequest): Promise<OcrResponse> {
    return this.request.post(`/v0.0/reservations/${reservationId}/ocr/verify`, data);
  }

  public async generateCleanUpImage(reservationId: number): Promise<UploadImageResponse> {
    return this.request.post(`/v0.0/reservations/${reservationId}/clean-up/url`);
  }
}

export class ReservationAdminController {
  constructor(private readonly request: ApiRequest) {}

  public async approveReservation(reservationId: number): Promise<void> {
    return this.request.post(`/v0.0/admin/reservation/${reservationId}/approve`);
  }

  public async rejectReservation(reservationId: number): Promise<void> {
    return this.request.post(`/v0.0/admin/reservation/${reservationId}/rejected`);
  }

  public async getNoshowsList(): Promise<NoshowListResponse> {
    return this.request.get('/v0.0/admin/reservation/noshows');
  }

  public async getUserReservationsList(): Promise<UserReservationListResponse> {
    return this.request.get('/v0.0/admin/reservations');
  }
}
