import { Injectable } from '@nestjs/common';
import { IUserToken } from './interface/user.token.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create_user_dto';

@Injectable()
export class TokenService {
    constructor (@InjectModel('Token') private readonly tokenModel: Model<IUserToken>){}
    async create (createUserTokenDto: CreateUserDto): Promise<IUserToken>{
        const userToken = new this.tokenModel(createUserTokenDto);
        return await userToken.save()
    }
    async exist (uId: string, token: string):Promise<boolean>{
        return await this.tokenModel.exists({uId, token})
    }
}
