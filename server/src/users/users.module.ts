import { Module } from '@nestjs/common';
import { RegistrationController } from './registration/registration.controller';
import { RegistrationService } from './registration/registration.service';
import { MongooseModelsModule } from './databases/mongoose-models.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginController, LoginService } from './login';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
    imports: [    
        MongooseModule.forRoot("mongodb://127.0.0.1:27017/users"),
        MongooseModelsModule,
        ConfigModule.forRoot(),
        JwtModule.register({ 
            global:true,
            secret: process.env.JWT_SECRET,
            // signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [
        RegistrationController, 
        LoginController,
    ],
    providers: [
        RegistrationService, 
        LoginService,
    ]
})
export class UsersModule {}
