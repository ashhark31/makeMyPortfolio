import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import {RegisterUserDto, RegistrationSchema } from '../dto';
import { RegistrationService } from './registration.service';
import { RegistrationValidation } from './registration.validation';

@Controller('registration')
export class RegistrationController {
    constructor(private service: RegistrationService){}

    @Post('add')
    @UsePipes(new RegistrationValidation(RegistrationSchema))
    addUser(@Body() registerUser: RegisterUserDto){
        return this.service.createUser(registerUser);
    }

    @Get('lists')
    getAllUsers(){
        return this.service.getUsers();
    }

    @Get(':id')
    getUser(@Param('id') id:string){
        return this.service.getUser(id);
    }

    @Put('update/:id')
    updateUser(@Param('id') id:string, @Body() registerUser:RegisterUserDto){
        return this.service.updateUser(id,registerUser);
    }

    @Delete('delete/:id')
    deleteUser(@Param('id') id:string){
        return this.service.deleteUser(id);
    }
}
