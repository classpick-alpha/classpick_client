import { LectureListResponse } from '@/api/dto/lecture';
import ApiRequest from '@/api/request';

export default class Lecture {
  constructor(private readonly request: ApiRequest) {}

  public async getLectures(id: string): Promise<LectureListResponse> {
    return this.request.get(`/v0.0/lectures/${id}`);
  }
}
