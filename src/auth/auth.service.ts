import {
  Injectable,
  Options,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { CreateUserTokenDto } from 'src/token/dto/create-user-token.dto';
import { SignOptions } from 'jsonwebtoken';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as moment from 'moment';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { userSensitiveFieldsEnum } from 'src/user/enums.ts/protected-fields.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}
  async singIn({ email, password }: SignInDto): Promise<IReadableUser> {
    const user = await this.userService.findByemail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const tokenPayLoad = {
        _id : user._id
      }
      const token = await this.generateToken(tokenPayLoad);
  
      const expireAt = moment()
        .add(1, 'day')
        .toISOString();
        
      await this.saveToken({
        token,
        expireAt,
        uId: user._id,
      });
      
      const readableUser = user.toObject() as IReadableUser;
      readableUser.accessToken = token;
      return _.omit<any>(
        readableUser,
        Object.values(userSensitiveFieldsEnum),
      ) as IReadableUser;
    }
    throw new BadRequestException('Invalid credentials');
  }

  private async generateToken(data, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }
  private async verifyToken(token): Promise<any> {
    try {
      const data = this.jwtService.verify(token);
      const tokenExists = await this.tokenService.exist(data._id, token);
      if (tokenExists) {
        return data;
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  private async saveToken(createUserTokenDto: CreateUserTokenDto) {
    const userToken = await this.tokenService.create(createUserTokenDto);

    return userToken;
  }
}
