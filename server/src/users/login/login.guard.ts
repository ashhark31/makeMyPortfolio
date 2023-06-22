import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { USER_MODEL, UserDocument } from "../databases/schemas";
import { Model } from "mongoose";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const auth = request.headers.authorization;
        const user_id = request.query._id;
        
        if(!auth){
            throw new UnauthorizedException("Unauthorized request.");
        }

        const token = auth.split(" ")[1];
        if(!token){
            throw new NotFoundException("Access denied. Token not found.");
        }

        try{
            const user =  await this.userModel.findOne({_id: user_id});
            const payload = await this.jwtService.verifyAsync(token)
            request['user'] = [payload, user];
        } catch{
            throw new UnauthorizedException("Invalid token.");
        }

        return true;
    }
}