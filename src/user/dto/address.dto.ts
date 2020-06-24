import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class AddressDto{
    @IsString()
    @IsOptional()
    country:string;
    @IsString()
    @IsOptional()
    sity:string;
    @IsString()
    @IsOptional()
    street: string;
}