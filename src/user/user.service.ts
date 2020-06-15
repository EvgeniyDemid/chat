import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.Interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create_user_dto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { UpdateUserDto } from './dto/update_user_dto';

@Injectable()
export class UserService {
    constructor(@InjectModel("User") private readonly UserModel: Model<IUser>){}

   async create (createUserDro: CreateUserDto, role: Array<string>): Promise<IUser>{
       const saltRounds = 10;
       const salt = await bcrypt.genSalt(saltRounds);
       const hash = await bcrypt.hash(createUserDro.password, salt);
       const createUser = new this.UserModel(_.assignIn(createUserDro, {password: hash, role}));
       return await createUser.save()
   } 

   async findAll():Promise<IUser[]>{
       return await this.UserModel.find()
   }

   async findOne(id):Promise<IUser>{
       return await this.UserModel.findById(id)
   }

   async updateOne(id: string , updateUserDto: UpdateUserDto):Promise<IUser>{
       return await this.UserModel.findByIdAndUpdate(id, updateUserDto,{new: true})
   }
}
