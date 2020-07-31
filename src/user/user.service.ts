import { Injectable, BadRequestException, HttpStatus, HttpException} from '@nestjs/common';
import { IUser } from './interfaces/user.Interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create_user_dto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { UpdateUserDto } from './dto/update_user_dto';
import { UpdatePasswordDto } from './dto/update_password_dto';

@Injectable()
export class UserService {
    constructor(@InjectModel("User") private readonly UserModel: Model<IUser>){}

   async create (createUserDro: CreateUserDto, role: Array<string>): Promise<IUser>{
       const{password,email, ...rest} = createUserDro;
       const userByEmail = await this.UserModel.findOne({email})
       if (userByEmail){
           throw new HttpException('Пользователь с таким email уже существет ', HttpStatus.CONFLICT);    
       }
       const saltRounds = 10;
       const salt = await bcrypt.genSalt(saltRounds);
       const hash = await bcrypt.hash(password, salt);
       const createUser = new this.UserModel(_.assignIn(createUserDro, {password: hash, role}));
       await createUser.save();
       return await this.UserModel.findOne({email})
        
   } 

   async findAll():Promise<IUser[]>{
       return await this.UserModel.find()
   }

   async findOne(id):Promise<IUser>{

       const userRw =  await this.UserModel.findById(id);
       
       if (!userRw){
        throw new HttpException('Пользователь с таким id не найден  ', HttpStatus.NOT_FOUND);    
    }
    return userRw

   }

   async updateOne(id: string , updateUserDto: UpdateUserDto):Promise<IUser>{
       
    const userRw =  await this.UserModel.findById(id);
       
    if (!userRw){
     throw new HttpException('Пользователь с таким id не найден  ', HttpStatus.NOT_FOUND);   
    }

    return await this.UserModel.findByIdAndUpdate(id, updateUserDto,{new: true})
   }

   async updatePassword(id: string, updatePassword:UpdatePasswordDto):Promise<Boolean>{
       const user = await this.UserModel.findById(id);
       const saltRounds = 10;
       const salt = await bcrypt.genSalt(saltRounds);
       const hash = await bcrypt.hash(updatePassword.password, salt);
       const userUpdatePassword = new this.UserModel(_.assignIn(user, {password: hash}));
       await this.UserModel.findByIdAndUpdate(id, user,{new: true})
       return true

   }

   async deleteOne(id: string):Promise<String>{
       await this.UserModel.findByIdAndDelete(id)
       return `{User by id: ${id} delete}`
   }

   async findByemail(email: string):Promise<IUser>{
       return await this.UserModel.findOne({email})
   }
}
