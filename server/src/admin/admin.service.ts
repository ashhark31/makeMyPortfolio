import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AdminDto } from "../users/dto";
import { AdminData } from "./admin.data";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AdminService{
    constructor(
        private readonly admin: AdminData,
        private readonly jwtService: JwtService,
    ){}

    async adminLoginService(adminData:AdminDto){
        const {email,password} = adminData;
        const admin = await this.admin.findOne(email);

        if(admin?.email !== email){
            throw new NotFoundException("Admin not found.");
        }

        if(admin?.password !== password){
            throw new UnauthorizedException("Password not matched.");
        }

        const payload = { email: admin.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
            admin_email: admin.email,
        }
    }
}