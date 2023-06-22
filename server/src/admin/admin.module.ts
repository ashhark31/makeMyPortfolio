import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminData } from "./admin.data";


@Module({
    controllers: [AdminController],
    providers: [AdminService,AdminData]
})
export class AdminModule{}