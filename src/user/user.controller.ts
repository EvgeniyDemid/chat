import { Controller, Post, Body, Get, Param, Put, Delete, Patch, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user_dto';
import { IUser } from './interfaces/user.Interface';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update_user_dto';
import { UpdatePasswordDto } from './dto/update_password_dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post()
    createUser(@Body()createUserDto: CreateUserDto, role):Promise<IUser>{
        return this.userService.create(createUserDto, role)
    }
    @UseGuards(AuthGuard("jwt"))
    @Get()
    findAll():Promise<IUser[]>{
        return this.userService.findAll()
    }

    @Get(':id')
    
    findOne(@Param('id') id: string){
        return this.userService.findOne(id)
    }
    @Put(':id')
    updateOne(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<IUser>{
        return this.userService.updateOne(id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.userService.deleteOne(id) 
    }
    @Patch(':id')
    updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Param('id') id: string){
        return this.userService.updatePassword(id, updatePasswordDto)
    }

}
