import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '../constants/error-codes';

export class ApiException extends HttpException {
  constructor(
    errorCode: string,
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    details?: any,
  ) {
    super(
      {
        success: false,
        error: {
          code: errorCode,
          message,
          details,
        },
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }

  static emailAlreadyExists(email: string): ApiException {
    return new ApiException(
      ERROR_CODES.AUTH.EMAIL_ALREADY_EXISTS,
      `User with email ${email} already exists`,
      HttpStatus.CONFLICT,
    );
  }

  static invalidVerificationToken(): ApiException {
    return new ApiException(
      ERROR_CODES.AUTH.INVALID_VERIFICATION_TOKEN,
      'Invalid verification token',
      HttpStatus.BAD_REQUEST,
    );
  }

  static userNotFound(): ApiException {
    return new ApiException(
      ERROR_CODES.AUTH.USER_NOT_FOUND,
      'User not found',
      HttpStatus.NOT_FOUND,
    );
  }
} 