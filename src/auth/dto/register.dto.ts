/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto  {
    @IsNotEmpty({ message: 'Username required!!!'})
    username: string;

    @IsNotEmpty({ message: 'Email required!!!'})
    @IsEmail({}, { message: 'The email format is incorrect.'})
    email: string;

    @IsNotEmpty({ message: 'Password required!!!'})
    password: string;
}