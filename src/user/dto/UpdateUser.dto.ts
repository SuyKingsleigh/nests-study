import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UniqueEmail } from '../validation/unique_email_validation.validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  @UniqueEmail({ message: 'Email já está em uso' })
  email: string;

  @MinLength(6)
  @IsOptional()
  password: string;
}
