import { NamePattern, PhoneNumberPattern, SchoolNumberPattern } from '@/api/validation';
import { z } from 'zod';

// ======================================== Constant ========================================
export enum Role {
  USER = 'USER',
  MANAGER = 'MANAGER',
}
// ======================================== Constant ========================================

// ======================================== Request ========================================
export const UpdateUserRequestSchema = z.object({
  name: z.string().regex(NamePattern, '올바른 이름이 아닙니다.'),
  userGroup: z.string().min(1, '학과를 입력해주세요.'),
  schoolNumber: z.string().regex(SchoolNumberPattern, '올바른 학번이 아닙니다.'),
  phoneNumber: z.string().regex(PhoneNumberPattern, '올바른 전화번호가 아닙니다.'),
});

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
// ======================================== Request ========================================

// ======================================== Response ========================================
export interface SafeUserResponse {
  userId: number;
  name: string;
}

export interface UserResponse {
  userId: number;
  name: string;
  role: Role;
  userGroup: string;
  schoolNumber: string;
  email: string;
  phoneNumber: string;
}
// ======================================== Response ========================================
