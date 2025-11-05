import { IsEmail, IsString } from "class-validator";

export class RegisterUserDto {
    @IsEmail()
    email: string;
    @IsString()
    nom: string;
    @IsString()
    password: string;

}