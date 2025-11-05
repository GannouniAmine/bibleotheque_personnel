import { IsString } from "class-validator";

export class ProfileUserDto{
    @IsString()
    email: string;
    @IsString()
    nom: string;
}