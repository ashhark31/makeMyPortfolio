import { Body, Controller, Post, Get, Req, UsePipes, UseGuards } from "@nestjs/common";
import { LoginDto, LoginSchema } from "../dto";
import { LoginService } from "./login.service";
import { LoginValidation } from "./login.validation";
import { LoginGuard } from "./login.guard";

@Controller()
export class LoginController {
    constructor(private service: LoginService){}

    @Post("login")
    @UsePipes(new LoginValidation(LoginSchema))
    login(@Body() loginData : LoginDto){   
        return this.service.userLogin(loginData);
    }

    @UseGuards(LoginGuard)
    @Get('profile')
    getProfile(@Req() req){
        return req.user;
    }
}