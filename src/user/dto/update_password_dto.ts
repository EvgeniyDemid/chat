
import {  IsString, IsNotEmpty,  Matches } from "class-validator";


export class UpdatePasswordDto {
    @IsNotEmpty()
    @IsString()
    @Matches( /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{16,})/,
    { message: 'Слабый пароль ' },)
    password:string;
}