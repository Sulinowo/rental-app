export class ApiResponseDto<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;

  constructor(success: boolean, data?: T, error?: { code: string; message: string; details?: any }) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T): ApiResponseDto<T> {
    return new ApiResponseDto(true, data);
  }

  static error(code: string, message: string, details?: any): ApiResponseDto {
    return new ApiResponseDto(false, undefined, { code, message, details });
  }
} 