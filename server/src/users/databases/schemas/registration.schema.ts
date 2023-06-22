import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { hash } from 'bcrypt';
import { Document } from 'mongoose';

@Schema({
    timestamps: true,
    collection: "user"
})
export class RegistrationSchema {
    @Prop({required:true})
    interest: string;

    @Prop({required:true})
    email: string;

    @Prop({required:true})
    title: string;

    @Prop({required:true})
    firstName: string;

    @Prop({required:false, default:''})
    middleName: string;

    @Prop({required:true})
    lastName: string;

    @Prop({required:true})
    mobile: string;

    @Prop({required:true})
    birth: Date;

    @Prop({default:[]})
    skills: string[];

    @Prop({required:true})
    country: string;

    @Prop({required:true})
    state: string;

    @Prop({required:true})
    city: string;

    @Prop({required:true, select:false})
    password: string;
}

const schema = SchemaFactory.createForClass(RegistrationSchema);

schema.pre("save", async function(next) {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
    next();
})

export const UserSchema = schema;
export const USER_MODEL = "User";
export type UserDocument = RegistrationSchema & Document;