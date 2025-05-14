// ======================================== Constant ========================================
export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}
// ======================================== Constant ========================================

// ======================================== Response ========================================
export interface LectureResponse {
  name: string;
  professor: string;
  dow: DayOfWeek;
  startTime: string;
  endTime: string;
}

export interface LectureListResponse {
  lectures: LectureResponse[];
}
// ======================================== Response ========================================
