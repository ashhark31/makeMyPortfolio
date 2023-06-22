import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RegisterUserDto } from "../dto";
import { InjectModel } from "@nestjs/mongoose";
import { USER_MODEL, UserDocument } from "../databases/schemas";
import { Model } from "mongoose";

@Injectable()
export class RegistrationService{
    constructor(
        @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>
    ){}

    async createUser(user: RegisterUserDto){
        const present = await this.userModel.findOne({email:user.email})
        const mobile = await this.userModel.findOne({mobile:user.mobile});

        if(present || mobile ){
            throw new BadRequestException("User Already Exists");
        }

        const createUser = await this.userModel.create(user);
        return createUser;
    }

    async getUsers(){
        const findAll = await this.userModel.find();
        return findAll;
    }

    async getUser(id: string){
        const findUser = await this.userModel.findById(id);
        if(!findUser){
            throw new NotFoundException("User Not Found");
        }
        return findUser;
    }

    async updateUser(id: string, user: RegisterUserDto){
        const findAndUpdate = await this.userModel.findByIdAndUpdate(id,user, {new:true});

        if(!findAndUpdate){
            throw new NotFoundException("User Not Found")
        }

        return findAndUpdate;
    }

    async deleteUser(id: string){
        const findAndDelete = await this.userModel.findByIdAndDelete(id);

        if(!findAndDelete){
            throw new NotFoundException("User Not Found")
        }
        
        return {
            _id: id,
        }
    }
}