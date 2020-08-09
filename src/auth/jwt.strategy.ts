import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/token/token.service';
import { IUser } from 'src/user/interfaces/user.Interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SICRET'),
      passReqToCallback: true,
    });
  }
  async validate(req, user: Partial<IUser>) {
    console.log(user);
    const token = req.headers.authorization.splice(7);

    const tokenExists = await this.tokenService.exist(user._id, token);
    if (tokenExists) {
      return user;
    } else {
       throw new UnauthorizedException();
    }
  }
}
