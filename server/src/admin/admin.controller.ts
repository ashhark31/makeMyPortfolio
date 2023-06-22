import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AdminDto } from "../users/dto";
import { AdminService } from "./admin.service";
import { AdminGuard } from "./admin.guard";

@Controller()
export class AdminController{
    constructor(private readonly service: AdminService){}

    @Post('login')
    adminLogin(@Body() adminData: AdminDto){
        return this.service.adminLoginService(adminData);
    }

    @UseGuards(AdminGuard)
    @Get('profile')
    getProfile(@Req() req){
        return req.admin;
    }
}