/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'Email required!!!'})
    @IsEmail({}, { message: 'The email format is incorrect.'})
    email: string;

    @IsNotEmpty({ message: 'Password required!!!'})
    password: string;
}