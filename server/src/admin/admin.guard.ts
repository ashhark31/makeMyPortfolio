import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminData } from "./admin.data";


@Injectable()
export class AdminGuard implements CanActivate{
    constructor(
        private readonly jwtService: JwtService,
        private readonly admin: AdminData,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const auth = request.headers.authorization;
        const admin_email = request.query._email;

        if(!auth){
            throw new UnauthorizedException("Unauthorized request.");
        }

        const token = auth.split(" ")[1];
        if(!token){
            throw new NotFoundException("Access Denied. Token not found.");
        }

        try{
            const admin = await this.admin.findDetails(admin_email);
            const payload = await this.jwtService.verifyAsync(token);
            request['admin'] = [payload,admin];

        } catch{
            throw new UnauthorizedException("Invalid token.");
        }        

        return true;
    }
}