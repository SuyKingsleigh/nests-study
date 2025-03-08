import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validation/unique_email_validation.validator";

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @UniqueEmail({message: 'Email já está em uso'})
    email: string;

    @MinLength(6)
    password: string;
}