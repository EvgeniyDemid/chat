import {Document} from 'mongoose'
import { IAddress } from './address.interface';

export interface IUser extends Document{
 readonly email: string;
 readonly avatar:string;
 readonly avatarId: string;
 readonly name: string;
 readonly suname: string;
 readonly age: number;
 readonly address: IAddress;
 readonly phone: string;
 readonly  gender: string;
 readonly password:string;
 readonly role: Array<string>;
}