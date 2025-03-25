import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
// import { SocialLoginDto } from './dto/social-login.dto';
// import { RefreshTokenDto } from './dto/refresh-token.dto';
// import { VerifyTokenDto } from './dto/verify-token.dto';
// import { LogoutDto } from './dto/logout.dto';
// import { ForgotPasswordDto } from './dto/forgot-password.dto';
// import { ResetPasswordDto } from './dto/reset-password.dto';
// import { ChangePasswordDto } from './dto/change-password.dto';
// import { VerificationEmailDto } from './dto/verification-email.dto';
// import { VerifyEmailDto } from './dto/verify-email.dto';
// import { SendOtpDto } from './dto/send-otp.dto';
// import { VerifyOtpDto } from './dto/verify-otp.dto';
// import { VerifyEmailTokenDto } from './dto/verify-email-token.dto';
// import { ChangeEmailDto } from './dto/change-email.dto';
// import { VerifyEmailChangeDto } from './dto/verify-email-change.dto';
// import { VerificationEmailChangeDto } from './dto/verification-email-change.dto';
// import { VerifyEmailChangeTokenDto } from './dto/verify-email-change-token.dto';
// import { VerifyPhoneNumberDto } from './dto/verify-phone-number.dto';
// import { ChangePhoneNumberDto } from './dto/change-phone-number.dto';
// import { VerifyPhoneNumberChangeDto } from './dto/verify-phone-number-change.dto';
// import { VerificationPhoneNumberChangeDto } from './dto/verification-phone-number-change.dto';
// import { VerifyPhoneNumberChangeTokenDto } from './dto/verify-phone-number-change-token.dto';
// import { ChangePhoneNumberTokenDto } from './dto/change-phone-number-token.dto';
// import { DeleteAccountDto } from './dto/delete-account.dto';
// import { UserProfileDto } from './dto/user-profile.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    // TODO : Implement registration logic
    try {
      // First, log the DTO to verify its contents
      console.log('Register DTO:', registerDto);

      // Check if email exists and is valid
      if (!registerDto.email) {
        throw new BadRequestException('Email is required');
      }
      // Check if email already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already registered');
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(registerDto.password, salt);

      // Get the "user" role
      const userRole = await this.prisma.role.findUnique({
        where: { name: 'user' },
      });

      if (!userRole) {
        throw new Error('Default user role not found');
      }

      // Create new user with required fields
      const newUser = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
          name: 'User', // You can update these default values
          surname: 'User',
          userName: `user_${Date.now()}`, // Generate a temporary username
          roleId: userRole.id,
          isActive: true,
          registerIp: '127.0.0.1', // You could get this from the request
        },
      });

      // Generate JWT token
      const payload = {
        sub: newUser.id,
        email: newUser.email,
      };

      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      });

      // Return user info and token
      return {
        feedbackMessage: 'User registered successfully',
        status: true,
        id: newUser.id,
        email: newUser.email,
        accessToken,
      };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error('Registration error:', error);
      throw new InternalServerErrorException(
        `Registration failed: ${error.message}`,
      );
    }
    // This should include validation, saving user to the database, etc.
    // checking if the user already exists

    // checking if the email is already registered
    // hash password

    // Create new user

    // Generate JWT token

    // save user to the database
    // generate verification token
    // send verification email
    // send verification SMS
    // send verification push notification
    // send verification in-app notification
    // send verification webhook
    // You can use the RegisterDto for validation
    // return registerDto;
  }
  // async login(loginDto: any): Promise<any> {
  //     // TODO : Implement login logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the LoginDto for validation
  //     return loginDto;
  // }
  // async socialLogin(socialLoginDto: any): Promise<any> {
  //     // TODO : Implement social login logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the SocialLoginDto for validation
  //     return socialLoginDto;
  // }
  // async refreshToken(refreshTokenDto: any): Promise<any> {
  //     // TODO : Implement refresh token logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the RefreshTokenDto for validation
  //     return refreshTokenDto;
  // }
  // async verifyToken(verifyTokenDto: any): Promise<any> {
  //     // TODO : Implement verify token logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerifyTokenDto for validation
  //     return verifyTokenDto;
  // }
  // async logout(logoutDto: any): Promise<any> {
  //     // TODO : Implement logout logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the LogoutDto for validation
  //     return logoutDto;
  // }
  // async forgotPassword(forgotPasswordDto: any): Promise<any> {
  //     // TODO : Implement forgot password logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the ForgotPasswordDto for validation
  //     return forgotPasswordDto;
  // }
  // async resetPassword(resetPasswordDto: any): Promise<any> {
  //     // TODO : Implement reset password logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the ResetPasswordDto for validation
  //     return resetPasswordDto;
  // }
  // async changePassword(changePasswordDto: any): Promise<any> {
  //     // TODO : Implement change password logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the ChangePasswordDto for validation
  //     return changePasswordDto;
  // }
  // async sendVerificationEmail(verificationEmailDto: any): Promise<any> {
  //     // TODO : Implement send verification email logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerificationEmailDto for validation
  //     return verificationEmailDto;
  // }
  // async verifyEmail(verifyEmailDto: any): Promise<any> {
  //     // TODO : Implement verify email logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerifyEmailDto for validation
  //     return verifyEmailDto;
  // }
  // async sendOtp(sendOtpDto: any): Promise<any> {
  //     // TODO : Implement send OTP logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the SendOtpDto for validation
  //     return sendOtpDto;
  // }
  // async verifyOtp(verifyOtpDto: any): Promise<any> {
  //     // TODO : Implement verify OTP logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerifyOtpDto for validation
  //     return verifyOtpDto;
  // }
  // async verifyEmailToken(verifyEmailTokenDto: any): Promise<any> {
  //     // TODO : Implement verify email token logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerifyEmailTokenDto for validation
  //     return verifyEmailTokenDto;
  // }
  // async changeEmail(changeEmailDto: any): Promise<any> {
  //     // TODO : Implement change email logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the ChangeEmailDto for validation
  //     return changeEmailDto;
  // }
  // async verifyEmailChange(verifyEmailChangeDto: any): Promise<any> {
  //     // TODO : Implement verify email change logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerifyEmailChangeDto for validation
  //     return verifyEmailChangeDto;
  // }
  // async sendVerificationEmailChange(verificationEmailChangeDto: any): Promise<any> {
  //     // TODO : Implement send verification email change logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerificationEmailChangeDto for validation
  //     return verificationEmailChangeDto;
  // }
  // async verifyEmailChangeToken(verifyEmailChangeTokenDto: any): Promise<any> {
  //     // TODO : Implement verify email change token logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerifyEmailChangeTokenDto for validation
  //     return verifyEmailChangeTokenDto;
  // }
  // async verifyPhoneNumber(verifyPhoneNumberDto: any): Promise<any> {
  //     // TODO : Implement verify phone number logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerifyPhoneNumberDto for validation
  //     return verifyPhoneNumberDto;
  // }
  // async changePhoneNumber(changePhoneNumberDto: any): Promise<any> {
  //     // TODO : Implement change phone number logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the ChangePhoneNumberDto for validation
  //     return changePhoneNumberDto;
  // }
  // async verifyPhoneNumberChange(verifyPhoneNumberChangeDto: any): Promise<any> {
  //     // TODO : Implement verify phone number change logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerifyPhoneNumberChangeDto for validation
  //     return verifyPhoneNumberChangeDto;
  // }
  // async sendVerificationPhoneNumberChange(verificationPhoneNumberChangeDto: any): Promise<any> {
  //     // TODO : Implement send verification phone number change logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerificationPhoneNumberChangeDto for validation
  //     return verificationPhoneNumberChangeDto;
  // }
  // async verifyPhoneNumberChangeToken(verifyPhoneNumberChangeTokenDto: any): Promise<any> {
  //     // TODO : Implement verify phone number change token logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the VerifyPhoneNumberChangeTokenDto for validation
  //     return verifyPhoneNumberChangeTokenDto;
  // }
  // async changePhoneNumberToken(changePhoneNumberTokenDto: any): Promise<any> {
  //     // TODO : Implement change phone number token logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the ChangePhoneNumberTokenDto for validation
  //     return changePhoneNumberTokenDto;
  // }

  // async deleteAccount(deleteAccountDto: any): Promise<any> {
  //     // TODO : Implement delete account logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the DeleteAccountDto for validation
  //     return deleteAccountDto;
  // }
  // async getUserProfile(userId: string): Promise<any> {
  //     // TODO : Implement get user profile logic
  //     // This should include validation, checking credentials, generating tokens, etc.
  //     // You can use the UserProfileDto for validation
  //     return { userId };
  // }
}
