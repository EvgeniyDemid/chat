
import { IsEmail, IsString, IsNotEmpty, IsNumber, IsPassportNumber, Matches, IsOptional, IsEnum } from "class-validator";
import { IAddress } from "../interfaces/address.interface";
import { genderEnum } from "../enums.ts/genderEnum";

export class CreateUserDto {
    @IsEmail()
    email: string;


    avatar: string;
    
    

    avatarId: string;
    
    

    @IsString()
    @IsNotEmpty()
    name: string;
    

    @IsString()
    @IsNotEmpty()
    suname: string;
    

    @IsNumber()
    @IsNotEmpty()
    age: number;
    

    @IsOptional()

    address: IAddress;


    @IsNotEmpty()
    @IsString()
    phone: string;
    
    

    @IsString()
    @IsNotEmpty()
    @IsEnum(genderEnum)
    gender: string;
    

    @IsString()
    @IsNotEmpty()
    @Matches( /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{16,})/,
    { message: 'Weak password' },)
    password:string;


    role:Array<string>;
}