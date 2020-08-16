import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { configModule } from 'src/modules/configure.root';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
    imports:[
        UserModule,
        TokenModule,
        configModule,
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_SICRET,
            signOptions: { expiresIn: '960s' },
          }),
    ],
    providers:[AuthService,JwtStrategy,],
    controllers:[AuthController]
})
export class AuthModule {}
