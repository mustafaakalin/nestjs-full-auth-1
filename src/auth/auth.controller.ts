import { Body, Controller, HttpCode, Post, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO : REGISTER
  @Version('1')
  @Post('register')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  async register(@Body() registerDto: RegisterDto) {
    // TODO : Implement registration logic
    // This should include validation, saving user to the database, etc.
    // You can use the RegisterDto for validation
    // const registerDto = new RegisterDto();
    console.log('Controller received DTO:', registerDto);
    return await this.authService.register(registerDto);
  }

  // TODO : LOGIN
  @Version('1')
  @Post('login')
  async login() {
    // TODO : Implement login logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the LoginDto for validation
    // const loginDto = new LoginDto();
    // await this.authService.login(loginDto);
  }

  // TODO : SOCIAL LOGIN
  @Version('1')
  @Post('social-login')
  async socialLogin() {
    // TODO : Implement social login logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the SocialLoginDto for validation
    // const socialLoginDto = new SocialLoginDto();
    // await this.authService.socialLogin(socialLoginDto);
  }

  // TODO : REFRESH TOKEN
  @Version('1')
  @Post('refresh-token')
  async refreshToken() {
    // TODO : Implement refresh token logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the RefreshTokenDto for validation
    // const refreshTokenDto = new RefreshTokenDto();
    // await this.authService.refreshToken(refreshTokenDto);
  }
  // TODO : VERIFY TOKEN
  @Version('1')
  @Post('verify-token')
  async verifyToken() {
    // TODO : Implement verify token logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the VerifyTokenDto for validation
    // const verifyTokenDto = new VerifyTokenDto();
    // await this.authService.verifyToken(verifyTokenDto);
  }
  // TODO : VERIFY OTP
  @Version('1')
  @Post('verify-otp')
  async verifyOtp() {
    // TODO : Implement verify OTP logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the VerifyOtpDto for validation
    // const verifyOtpDto = new VerifyOtpDto();
    // await this.authService.verifyOtp(verifyOtpDto);
  }
  // TODO : SEND OTP
  @Version('1')
  @Post('send-otp')
  async sendOtp() {
    // TODO : Implement send OTP logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the SendOtpDto for validation
    // const sendOtpDto = new SendOtpDto();
    // await this.authService.sendOtp(sendOtpDto);
  }

  // TODO : LOGOUT
  @Version('1')
  @Post('logout')
  async logout() {
    // TODO : Implement logout logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the LogoutDto for validation
    // const logoutDto = new LogoutDto();
    // await this.authService.logout(logoutDto);
  }

  // TODO : FORGOT PASSWORD
  @Version('1')
  @Post('forgot-password')
  async forgotPassword() {
    // TODO : Implement forgot password logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the ForgotPasswordDto for validation
    // const forgotPasswordDto = new ForgotPasswordDto();
    // await this.authService.forgotPassword(forgotPasswordDto);
  }

  // TODO : RESET PASSWORD
  @Version('1')
  @Post('reset-password')
  async resetPassword() {
    // TODO : Implement reset password logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the ResetPasswordDto for validation
    // const resetPasswordDto = new ResetPasswordDto();
    // await this.authService.resetPassword(resetPasswordDto);
  }

  // TODO : VERIFY EMAIL
  @Post('verify-email')
  async verifyEmail() {
    // TODO : Implement verify email logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the VerifyEmailDto for validation
    // const verifyEmailDto = new VerifyEmailDto();
    // await this.authService.verifyEmail(verifyEmailDto);
  }
  // TODO : CHANGE EMAIL
  @Version('1')
  @Post('change-email')
  async changeEmail() {
    // TODO : Implement change email logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the ChangeEmailDto for validation
    // const changeEmailDto = new ChangeEmailDto();
    // await this.authService.changeEmail(changeEmailDto);
  }

  // TODO : VERIFY PHONE NUMBER
  @Version('1')
  @Post('verify-phone')
  async verifyPhone() {
    // TODO : Implement verify phone logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the VerifyPhoneDto for validation
    // const verifyPhoneDto = new VerifyPhoneDto();
    // await this.authService.verifyPhone(verifyPhoneDto);
  }

  // TODO : CHANGE PHONE NUMBER
  @Version('1')
  @Post('change-phone')
  async changePhone() {
    // TODO : Implement change phone logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the ChangePhoneDto for validation
    // const changePhoneDto = new ChangePhoneDto();
    // await this.authService.changePhone(changePhoneDto);
  }
  // TODO : CHANGE PASSWORD
  @Version('1')
  @Post('change-password')
  async changePassword() {
    // TODO : Implement change password logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the ChangePasswordDto for validation
    // const changePasswordDto = new ChangePasswordDto();
    // await this.authService.changePassword(changePasswordDto);
  }
  // TODO : DELETE ACCOUNT
  @Version('1')
  @Post('delete-account')
  async deleteAccount() {
    // TODO : Implement delete account logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the DeleteAccountDto for validation
    // const deleteAccountDto = new DeleteAccountDto();
    // await this.authService.deleteAccount(deleteAccountDto);
  }
  // TODO : GET USER PROFILE
  @Version('1')
  @Post('profile')
  async getUserProfile() {
    // TODO : Implement get user profile logic
    // This should include validation, checking credentials, generating tokens, etc.
    // You can use the GetUserProfileDto for validation
    // const getUserProfileDto = new GetUserProfileDto();
    // await this.authService.getUserProfile(getUserProfileDto);
  }
}
