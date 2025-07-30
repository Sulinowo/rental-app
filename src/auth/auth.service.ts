import { Injectable } from '@nestjs/common';
import { ApiException } from '../common/exceptions/api-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string; user: Partial<User> }> {
    const { email, firstName, lastName, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw ApiException.emailAlreadyExists(email);
    }

    // Generate email verification token
    const emailVerificationToken = randomBytes(32).toString('hex');

    // Create new user
    const user = this.userRepository.create({
      email,
      firstName,
      lastName,
      password,
      emailVerificationToken,
    });

    const savedUser = await this.userRepository.save(user);

    // Remove sensitive data from response
    const {
      password: _,
      emailVerificationToken: __,
      ...userResponse
    } = savedUser;

    // TODO: Send verification email
    console.log(
      `Verification email should be sent to ${email} with token: ${emailVerificationToken}`,
    );

    return {
      message:
        'User registered successfully. Please check your email to verify your account.',
      user: userResponse,
    };
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      throw ApiException.invalidVerificationToken();
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    await this.userRepository.save(user);

    return { message: 'Email verified successfully' };
  }

  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
