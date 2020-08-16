import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authServise: AuthService){}
    @Post()
    async singIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<any>{
        return this.authServise.singIn(signInDto)
    }
    
}
