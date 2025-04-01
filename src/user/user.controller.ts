import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/request/create-user-request';
import { UserService } from './user.service';
import { UserResponse } from './dto/response/user-response';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUserRequest: CreateUserRequest): Promise<UserResponse> {
        return this.userService.createUser(createUserRequest);
    }
}
