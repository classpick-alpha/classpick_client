import { SafeUserResponse, UpdateUserRequest, UserResponse } from '@/api/dto/user';
import ApiRequest from '@/api/request';

export class UserController {
  constructor(private readonly request: ApiRequest) {}

  public async getUserById(userId: number): Promise<SafeUserResponse> {
    return this.request.get(`/v0.0/users/${userId}`);
  }

  public async updateUserInfo(data: UpdateUserRequest): Promise<UserResponse> {
    return this.request.put('/v0.0/users/info', data);
  }
}
