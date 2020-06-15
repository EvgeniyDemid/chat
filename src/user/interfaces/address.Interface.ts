import { IsNotEmpty } from "class-validator"

export interface IAddress{
    country:string,
    sity:string,
    street: string
}