import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { configModule } from './modules/configure.root';
import { mongodbModule } from './modules/mondodb.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    configModule,
    mongodbModule,
    AuthModule,
    UserModule,
    TokenModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
