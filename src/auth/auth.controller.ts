import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<ApiResponseDto> {
    const result = await this.authService.register(registerDto);
    return ApiResponseDto.success(result);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<ApiResponseDto> {
    const result = await this.authService.verifyEmail(token);
    return ApiResponseDto.success(result);
  }
}
