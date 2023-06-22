import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "../dto";
import { InjectModel } from "@nestjs/mongoose";
import { USER_MODEL, UserDocument } from "../databases/schemas";
import { Model } from "mongoose";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginService{
    constructor(
        @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ){}

    async userLogin(login: LoginDto){
        const {email, password} = login;
        const user = await this.userModel.findOne({email}, "+password")
        
        if(!user){
            throw new NotFoundException("User not found, please register first !!!")
        }
        
        const isPwdMatched = await compare(password, user.password);
        
        if(!isPwdMatched){
            throw new UnauthorizedException("Wrong password, please enter correct password !!!");
        }

        const payload = { sub: user._id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user_id: user._id,
        }
    }
}