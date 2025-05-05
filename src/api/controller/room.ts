import { RoomListResponse, RoomTimeTableResponse } from '@/api/dto/room';
import ApiRequest from '@/api/request';

export default class Room {
  constructor(private readonly request: ApiRequest) {}

  public async getRooms(
    userId: number,
    placeName?: string,
    capacity?: number,
    date?: string,
    startTime?: string,
    endTime?: string,
  ): Promise<RoomListResponse> {
    const searchParams = new URLSearchParams();
    if (placeName) searchParams.append('placeName', placeName);
    if (capacity) searchParams.append('capacity', capacity.toString());
    if (date) searchParams.append('date', date);
    if (startTime) searchParams.append('startTime', startTime);
    if (endTime) searchParams.append('endTime', endTime);

    return this.request.get(`/v0.0/rooms?${searchParams}`);
  }

  public async getRoomTimeTable(roomId: number, date: string): Promise<RoomTimeTableResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('date', date);

    return this.request.get(`/v0.0/rooms/${roomId}${searchParams}`);
  }
}
