import { IsEmail, IsString, IsNotEmpty, IsNumber, IsPassportNumber, Matches, IsOptional, IsEnum } from "class-validator";
import { IAddress } from "../interfaces/address.interface";
import { genderEnum } from "../enums.ts/genderEnum";

export class UpdateUserDto {

    avatar: string;    
    
    avatarId: string;
    
    @IsString()
    name: string;

    @IsString()
    suname: string;

    @IsNumber()
    age: number;
    

    @IsOptional()

    address: IAddress;

    @IsString()
    phone: string;
    
    

    @IsString()
    @IsEnum(genderEnum)
    gender: string;
    


    role:Array<string>;
}