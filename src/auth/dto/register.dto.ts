import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
//   @ApiProperty({
//     description: 'User first name',
//     example: 'John',
//     maxLength: 100,
//   })
//   @IsString()
//   @IsNotEmpty({ message: 'Name is required' })
//   @MaxLength(100, { message: 'Name cannot exceed 100 characters' })
//   name: string;

//   @ApiProperty({
//     description: 'User last name',
//     example: 'Doe',
//     maxLength: 100,
//   })
//   @IsString()
//   @IsNotEmpty({ message: 'Surname is required' })
//   @MaxLength(100, { message: 'Surname cannot exceed 100 characters' })
//   surname: string;

//   @ApiProperty({
//     description: 'Username for login',
//     example: 'johndoe',
//     maxLength: 50,
//   })
//   @IsString()
//   @IsNotEmpty({ message: 'Username is required' })
//   @MaxLength(50, { message: 'Username cannot exceed 50 characters' })
//   @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' })
//   userName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    maxLength: 255,
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(255, { message: 'Email cannot exceed 255 characters' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Password123!',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 255, { message: 'Password must be between 8 and 255 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

//   @ApiPropertyOptional({
//     description: 'User phone number',
//     example: '+905551234567',
//   })
//   @IsOptional()
//   @IsString()
//   @MaxLength(20, { message: 'Phone number cannot exceed 20 characters' })
//   @Matches(/^\+?[0-9\s-()]+$/, { message: 'Please provide a valid phone number' })
//   phoneNo?: string;

//   @ApiPropertyOptional({
//     description: 'User national identity number',
//     example: '12345678901',
//   })
//   @IsOptional()
//   @IsString()
//   @MaxLength(20, { message: 'Identity number cannot exceed 20 characters' })
//   identityNo?: string;

//   @ApiProperty({
//     description: 'IP address of the registering user',
//     example: '127.0.0.1',
//     required: false,
//   })
//   @IsOptional()
//   @IsString()
//   @MaxLength(45, { message: 'IP address cannot exceed 45 characters' })
//   registerIp?: string;
}