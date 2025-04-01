import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './models/User';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema, collection: "users" }
    ])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule { }
