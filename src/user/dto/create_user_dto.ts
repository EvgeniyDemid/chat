
import { IsEmail, IsString, IsNotEmpty, IsNumber, IsPassportNumber, Matches, IsOptional, IsEnum } from "class-validator";
import { IAddress } from "../interfaces/address.interface";
import { genderEnum } from "../enums.ts/genderEnum";

export class CreateUserDto {
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
    

    @IsOptional()
    @IsNotEmpty({message:"Укажите ваш адрес проживания "})
    address: IAddress;


    @IsNotEmpty({message:'Укажите ваш контакный телефон'})
    @IsString()
    phone: string;
    
    

    @IsString()
    @IsNotEmpty()
    @IsEnum(genderEnum)
    gender: string;
    

    @IsString()
    @IsNotEmpty()
    @Matches( /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{16,})/,
    { message: 'Слабый пароль ' },)
    password:string;


    role:Array<string>;
}