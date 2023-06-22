import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';
import { LocationModule } from './locations/location.module';
import { AdminModule } from './admin/admin.module';

const USERS_ROUTE = [{path:'users', module: UsersModule}];
const LOCATION_ROUTE = [{path:'locations', module: LocationModule}];
const ADMIN_ROUTE = [{path:'admin', module: AdminModule}];

@Module({
  imports: [
    UsersModule, RouterModule.register(USERS_ROUTE),
    LocationModule, RouterModule.register(LOCATION_ROUTE), 
    AdminModule, RouterModule.register(ADMIN_ROUTE),
  ]
})
export class AppModule {}
