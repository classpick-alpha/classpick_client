export default interface ApiResponse<T> {
  status: number;
  message: string;
  timestamp: string;
  data: T;
}
