import { Module } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenShema } from './shemas/user_token';
import { TokenService } from './token.service';

@Module({
    imports:[
        MongooseModule.forFeature([{name:'Token', schema: TokenShema}])
    ],
    providers:[TokenService],
    exports:[TokenService]
})
export class TokenModule {}
