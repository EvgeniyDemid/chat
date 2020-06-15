import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user_dto';
import { IUser } from './interfaces/user.Interface';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update_user_dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post()
    createUser(@Body()createUserDto: CreateUserDto, role):Promise<IUser>{
        return this.userService.create(createUserDto, role)
    }
    
    @Get()
    findAll():Promise<IUser[]>{
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.userService.findOne(id)
    }
    @Put(':id')
    updateOne(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<IUser>{
        return this.userService.updateOne(id,updateUserDto)
    }

    

}
