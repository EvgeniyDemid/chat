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
      jwtFromRequest: ExtractJwt.fromHeader('access_token'),
      secretOrKey: configService.get<string>('JWT_SICRET'),
      passReqToCallback: true,
    });
  }
  validate(payload: IUser): IUser {
    return payload;
}}
