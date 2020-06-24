import { IsEmail, IsString, IsNotEmpty, IsNumber, IsPassportNumber, Matches, IsOptional, IsEnum } from "class-validator";
import { IAddress } from "../interfaces/address.interface";
import { genderEnum } from "../enums.ts/genderEnum";
import { AddressDto } from "./address.dto";

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email: string;
    @IsOptional()
    @IsString({message:"Загрузите вашу аватарку"})
    avatar: string;
    
    avatarId: string;
    
    @IsOptional()
    @IsString({message:"Поле имя должно быть строкой"})
    name: string;
    
    @IsOptional()
    @IsString({message:"Поле Фамилия должно быть строкой"})
    suname: string;
    
    @IsOptional()
    @IsNumber()
    age: number;
    

    @IsOptional({message:"Укажите ваш адрес проживания "})
    address: AddressDto;

    @IsOptional()
    @IsString()
    phone: string;
    
    
    @IsOptional()
    @IsString()
    @IsEnum(genderEnum)
    gender: string;
    
    @IsOptional()
    @IsString()
    @Matches( /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{16,})/,
    { message: 'Слабый пароль ' },)
    password:string;

    @IsOptional()
    role:Array<string>;
}