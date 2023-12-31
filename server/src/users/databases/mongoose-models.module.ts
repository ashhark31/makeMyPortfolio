import { Global, Module } from "@nestjs/common";
import { USER_MODEL, UserSchema } from "./schemas";
import { MongooseModule } from "@nestjs/mongoose";

const MODELS = [
    { name: USER_MODEL, schema: UserSchema},
]

@Global()
@Module({
    imports: [MongooseModule.forFeature(MODELS)],
    exports: [MongooseModule]
})
export class MongooseModelsModule{}