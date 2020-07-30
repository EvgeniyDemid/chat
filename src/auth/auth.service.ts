import { Injectable, Options, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { CreateUserTokenDto } from 'src/token/dto/create-user-token.dto';
import { SignOptions } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private userServise: UserService,
        private jwtService: JwtService,
        private tokenService: TokenService


    ){}
  singIn(email, password){

  }
  private async generateToken(data, options?: SignOptions):Promise<string>{
      return this.jwtService.sign(data,options)
  }
  private async verifyToken(token):Promise<any>{
      try{
          const data = this.jwtService.verify(token);
          const tokenExists = await this.tokenService.exist(data._id, token);
          if(tokenExists){
              return data
          }
          throw new UnauthorizedException();
      } catch (error){
          throw new UnauthorizedException()
      }
      
    
  }
  private async saveToken(createUserTokenDto: CreateUserTokenDto) {
    const userToken = await this.tokenService.create(createUserTokenDto);

    return userToken;
}
  
}
