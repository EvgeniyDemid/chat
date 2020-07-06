import { IsEmail, IsString, IsNotEmpty, IsNumber, IsPassportNumber, Matches, IsOptional, IsEnum } from "class-validator";
import { IAddress } from "../interfaces/address.interface";
import { genderEnum } from "../enums.ts/genderEnum";
import { AddressDto } from "./address.dto";
import { Exclude } from "class-transformer";
import { CreateUserDto } from "./create_user_dto";

export class UpdateUserDto extends CreateUserDto {
  
    @Exclude()
    @IsOptional()
    @IsString()
    @Matches( /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{16,})/,
    { message: 'Слабый пароль ' },)
    password:string;
}