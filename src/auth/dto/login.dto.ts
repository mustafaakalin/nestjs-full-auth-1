import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 100, { message: 'Password must be between 8 and 100 characters' })
  password: string;
}