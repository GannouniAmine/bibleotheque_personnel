import { IsDate, IsEnum, IsInt, IsString } from "class-validator";

export class BookCreateDto {
    @IsString()
    title: string;
    @IsString()
    author: string;
    @IsString()
    ISBN: string;
    @IsDate()
    publicationDate: Date;
    @IsString()
    genre: string;
    @IsString()
    coverUrl: string
}
