import { IsEmail, IsString, IsNotEmpty, IsNumber, IsPassportNumber, Matches, IsOptional, IsEnum } from "class-validator";
import { genderEnum } from "../enums.ts/genderEnum";
import { AddressDto } from "./address.dto";

export class UserRestonsDto {
    @IsNotEmpty({message: 'Поле email обязательно для заполнения'})
    @IsEmail()
    email: string;

    @IsString({message:"Загрузите вашу аватарку"})
    avatar: string;
    
    avatarId: string;
    
    

    @IsString({message:"Поле имя должно быть строкой"})
    @IsNotEmpty({message: 'Поле Имя обязательно для заполения '})
    name: string;
    

    @IsString({message:"Поле Фамилия должно быть строкой"})
    @IsNotEmpty({message: 'Поле Фамилия обязательно для заполения '})
    suname: string;
    

    @IsNumber()
    @IsNotEmpty({message:"Укажите ваш возраст"})
    age: number;
    

    @IsOptional({message:"Укажите ваш адрес проживания "})
    address: AddressDto;


    @IsNotEmpty({message:'Укажите ваш контакный телефон'})
    @IsString()
    phone: string;
    
    

    @IsString()
    @IsNotEmpty()
    @IsEnum(genderEnum)
    gender: string;
    


    role:Array<string>;
}